use clap::Parser;
use frost_ed25519::{
    self as frost, Ciphersuite, Ed25519ScalarField, Ed25519Sha512, Field, Group, Identifier,
    SigningPackage,
    keys::{IdentifierList, KeyPackage, PublicKeyPackage, SecretShare},
};
use futures::StreamExt;
use iroh::{
    PublicKey, SecretKey, Watcher,
    discovery::{dns::DnsDiscovery, pkarr::PkarrPublisher},
    endpoint::{RecvStream, SendStream},
};
use rand::thread_rng;
use sha2::{Digest, Sha512};
use ssh_key::LineEnding;
use std::{
    collections::BTreeMap,
    fs,
    path::{Path, PathBuf},
    str::FromStr,
};
use tokio::io::{AsyncReadExt, AsyncWrite, AsyncWriteExt};
use tracing::{error, info, warn};

const COSIGN_ALPN: &[u8] = b"FROST_COSIGN";

#[derive(Debug, clap::Parser)]
struct Args {
    #[clap(subcommand)]
    cmd: Command,
}

#[derive(Debug, clap::Parser)]
enum Command {
    Split(SplitArgs),
    ReSplit(ReSplitArgs),
    SignLocal(SignLocalArgs),
    Sign(SignArgs),
    Cosign(CosignArgs),
}

#[derive(Debug, clap::Parser)]
struct SplitArgs {
    /// Key to split
    #[clap(long)]
    key: PathBuf,
    #[clap(long, default_value_t = 2, help = "Minimum number of signers")]
    min_signers: u16,
    #[clap(long, default_value_t = 3, help = "Maximum number of signers")]
    max_signers: u16,
    #[clap(long, help = "Directory to store the key shares")]
    target: PathBuf,
}

#[derive(Debug, clap::Parser)]
struct SignLocalArgs {
    directories: Vec<String>,
    #[clap(long)]
    message: String,
    #[clap(long)]
    key: PublicKey,
}

#[derive(Debug, clap::Parser)]
struct ReSplitArgs {
    directories: Vec<String>,
    #[clap(long)]
    key: PublicKey,
    #[clap(long, default_value_t = 2, help = "Minimum number of signers")]
    min_signers: u16,
    #[clap(long, default_value_t = 3, help = "Maximum number of signers")]
    max_signers: u16,
    #[clap(long, help = "Directory to store the key shares")]
    target: PathBuf,
}

#[derive(Debug, clap::Parser)]
struct SignArgs {
    cosigners: Vec<PublicKey>,
    #[clap(long)]
    message: String,
    #[clap(long)]
    key: PublicKey,
    /// Optional path to the directory where the fragments are stored
    /// If not provided, the current directory is used
    #[clap(long)]
    data_path: Option<PathBuf>,
}

#[derive(Debug, clap::Parser)]
struct CosignArgs {
    /// Optional path to the directory where the fragments are stored
    /// If not provided, the current directory is used
    #[clap(long)]
    data_path: Option<PathBuf>,
}

fn try_from_openssh<T: AsRef<[u8]>>(data: T) -> anyhow::Result<iroh::SecretKey> {
    let ser_key = ssh_key::private::PrivateKey::from_openssh(data)?;
    match ser_key.key_data() {
        ssh_key::private::KeypairData::Ed25519(kp) => {
            Ok(SecretKey::from_bytes(&kp.private.to_bytes()))
        }
        _ => anyhow::bail!("invalid key format"),
    }
}

fn to_openssh(key: &SecretKey) -> ssh_key::Result<zeroize::Zeroizing<String>> {
    let ckey = ssh_key::private::Ed25519Keypair {
        public: key.secret().verifying_key().into(),
        private: key.secret().clone().into(),
    };
    ssh_key::private::PrivateKey::from(ckey).to_openssh(LineEnding::default())
}

fn split(args: SplitArgs) -> anyhow::Result<()> {
    if args.max_signers < args.min_signers {
        anyhow::bail!("max-signers must be greater than or equal to min-signers");
    }
    let max_signers = args.max_signers;
    let min_signers = args.min_signers;
    let key = fs::read_to_string(&args.key)?;
    let iroh_key = try_from_openssh(key)?;
    let key_bytes = iroh_key.to_bytes();
    let scalar = ed25519_secret_key_to_scalar(&key_bytes);
    let key = frost::SigningKey::from_scalar(scalar)?;
    println!(
        "Splitting key {} into {} parts",
        iroh_key.public(),
        max_signers
    );
    let (parts, pubkey) = frost::keys::split(
        &key,
        max_signers,
        min_signers,
        IdentifierList::Default,
        &mut thread_rng(),
    )?;
    let pubkey_bytes = pubkey.serialize()?;
    for (i, secret_share) in parts.values().enumerate() {
        let n = i + 1;
        let path: PathBuf = args.target.join(n.to_string());
        println!("Storing part {} in directory {}", n, path.display());
        fs::create_dir_all(&path)?;
        let pubkey_path = path.join(format!("{}.pub", iroh_key.public()));
        fs::write(pubkey_path, &pubkey_bytes)?;
        let key_path = path.join(format!("{}.secret", iroh_key.public()));
        let secret_share_bytes = secret_share.serialize()?;
        fs::write(key_path, secret_share_bytes)?;
    }
    Ok(())
}

fn resplit(args: ReSplitArgs) -> anyhow::Result<()> {
    if args.directories.len() < 2 {
        anyhow::bail!("At least two directories are required");
    }
    if args.max_signers < args.min_signers {
        anyhow::bail!("max-signers must be greater than or equal to min-signers");
    }
    println!("Reconstructing key from {:?}", args.directories);
    let mut parts = Vec::new();
    let key = args.key;
    for part in args.directories.iter() {
        let secret_share_path = PathBuf::from(part).join(format!("{key}.secret"));
        let secret_share_bytes = fs::read(&secret_share_path)?;
        let secret_share = SecretShare::deserialize(&secret_share_bytes)?;
        let key_package = frost::keys::KeyPackage::try_from(secret_share)?;
        let public_key_package_path = PathBuf::from(part).join(format!("{key}.pub"));
        let public_key_package_bytes = fs::read(&public_key_package_path)?;
        let public_key_package = PublicKeyPackage::deserialize(&public_key_package_bytes)?;
        parts.push((key_package, public_key_package));
    }
    let key_packages = parts
        .iter()
        .map(|(key_package, _)| key_package.clone())
        .collect::<Vec<_>>();
    let secret = frost::keys::reconstruct(key_packages.as_slice())?;
    let (parts, pubkey) = frost::keys::split(
        &secret,
        args.max_signers,
        args.min_signers,
        IdentifierList::Default,
        &mut thread_rng(),
    )?;
    let public_key_package_bytes = pubkey.serialize()?;
    println!("Re-splitting key into {} parts", args.max_signers);
    for (i, (_, secret_share)) in parts.iter().enumerate() {
        let n = i + 1;
        let secret_share_bytes = secret_share.serialize()?;
        let dir = args.target.join(format!("{n}"));
        println!("Storing part {} in directory {}", n, dir.display());
        fs::create_dir_all(&dir)?;
        let secret_share_path = dir.join(format!("{}.secret", args.key));
        fs::write(secret_share_path, secret_share_bytes)?;
        let public_key_package_path = dir.join(format!("{}.pub", args.key));
        fs::write(public_key_package_path, public_key_package_bytes.clone())?;
    }
    Ok(())
}

fn sign_local(args: SignLocalArgs) -> anyhow::Result<()> {
    let mut parts = Vec::new();
    let mut paths = Vec::new();
    let key = args.key;
    for part in args.directories.iter() {
        let secret_share_path = PathBuf::from(part).join(format!("{key}.secret"));
        let secret_share_bytes = fs::read(&secret_share_path)?;
        paths.push(secret_share_path);
        let secret_share = SecretShare::deserialize(&secret_share_bytes)?;
        let key_package = frost::keys::KeyPackage::try_from(secret_share)?;
        parts.push(key_package);
    }
    let secret = frost::keys::reconstruct(parts.as_slice())?;
    println!("Reconstructed a signing key from {paths:?}");
    let msg = args.message.as_bytes();
    let signature = secret.sign(rand::thread_rng(), msg);
    let signature_bytes = signature.serialize()?;
    println!("Signature: {}", hex::encode(&signature_bytes));
    let iroh_signature = iroh_base::Signature::from_slice(&signature_bytes)?;
    let res = key.verify(msg, &iroh_signature);
    if res.is_err() {
        println!("Verification failed: {res:?}");
        res?;
    }
    Ok(())
}

fn ed25519_secret_key_to_scalar(secret_key: &[u8; 32]) -> <Ed25519ScalarField as Field>::Scalar {
    // Step 1: Hash the secret key using SHA-512
    let mut hasher = Sha512::new();
    hasher.update(secret_key);
    let hash = hasher.finalize();

    // Step 2: Take the first 32 bytes of the hash and apply bit manipulations
    let mut scalar_bytes = [0u8; 32];
    scalar_bytes.copy_from_slice(&hash[..32]);

    // Step 3: Perform bitwise manipulations to ensure it's a valid scalar
    scalar_bytes[0] &= 248; // Clear the lowest 3 bits
    scalar_bytes[31] &= 127; // Clear the highest bit
    scalar_bytes[31] |= 64; // Set the second highest bit

    // Step 4: Create the Scalar from the modified bytes
    <Ed25519ScalarField as Field>::Scalar::from_bytes_mod_order(scalar_bytes)
}

async fn handle_cosign_request(
    incoming: iroh::endpoint::Incoming,
    data_path: PathBuf,
) -> anyhow::Result<()> {
    // we don't need to check the ALPN, since we only accept connections with the correct ALPN
    let connection = incoming.await?;
    let remote_node_id = connection.remote_node_id()?;
    info!("Incoming connection from {}", remote_node_id,);
    let (mut send, mut recv) = connection.accept_bi().await?;
    let key_bytes = read_exact_bytes(&mut recv).await?;
    let key = PublicKey::from_bytes(&key_bytes)?;
    info!("Received request to co-sign for key {}", key);
    let secret_share_path = data_path.join(format!("{key}.secret"));
    let secret_share_bytes = tokio::fs::read(&secret_share_path).await?;
    let secret_share = SecretShare::deserialize(&secret_share_bytes)?;
    let key_package = KeyPackage::try_from(secret_share)?;
    info!("Got fragment, creating commitment");
    let (nonces, commitments) =
        frost::round1::commit(key_package.signing_share(), &mut thread_rng());
    info!("Sending identifier");
    send.write_all(&key_package.identifier().serialize())
        .await?;
    info!("Sending commitment");
    write_lp(&mut send, &commitments.serialize()?).await?;
    info!("Waiting for signing package");
    let signing_package = SigningPackage::deserialize(&read_lp(&mut recv).await?)?;
    info!("Received signing package, creating signature share");
    let signature_share = frost::round2::sign(&signing_package, &nonces, &key_package)?;
    info!("Sending signature share");
    send.write_all(&signature_share.serialize()).await?;
    info!("Finished handling cosign request");
    // wait for the connection to close.
    // if we don't do this, we might lose the last message in transit
    // See https://www.iroh.computer/blog/closing-a-quic-connection for details
    connection.closed().await;
    Ok(())
}

async fn send_cosign_request_round1(
    endpoint: &iroh::Endpoint,
    cosigner: &PublicKey,
    key: &PublicKey,
) -> anyhow::Result<(
    SendStream,
    RecvStream,
    Identifier,
    frost::round1::SigningCommitments,
)> {
    let connection = endpoint.connect(*cosigner, COSIGN_ALPN).await?;
    let (mut send, mut recv) = connection.open_bi().await?;
    info!("Sending cosign request for key {} to {}", key, cosigner);
    send.write_all(key.as_bytes()).await?;
    let identifier_bytes: <<<Ed25519Sha512 as Ciphersuite>::Group as Group>::Field as Field>::Serialization = read_exact_bytes(&mut recv).await?;
    let identifier = Identifier::deserialize(&identifier_bytes)?;
    let commitments_bytes = read_lp(&mut recv).await?;
    let commitments = frost::round1::SigningCommitments::deserialize(&commitments_bytes)?;
    info!("Received commitments");
    Ok((send, recv, identifier, commitments))
}

async fn sign(args: SignArgs) -> anyhow::Result<()> {
    let data_path = args.data_path.unwrap_or_else(|| PathBuf::from("."));
    let secret_key = get_or_create_key(&data_path.join("keypair"))?;
    let key = args.key;
    let secret_share_path = data_path.join(format!("{key}.secret"));
    info!("Reading secret share from {}", secret_share_path.display());
    let secret_share_bytes = fs::read(&secret_share_path)?;
    let secret_share = SecretShare::deserialize(&secret_share_bytes)?;
    let key_package = KeyPackage::try_from(secret_share)?;
    if args.cosigners.len() + 1 < (*key_package.min_signers() as usize) {
        anyhow::bail!(
            "At least {} cosigners are required",
            key_package.min_signers() - 1
        );
    }
    let public_key_package_path = data_path.join(format!("{key}.pub"));
    info!(
        "Reading public key package from {}",
        public_key_package_path.display()
    );
    let public_key_package = PublicKeyPackage::deserialize(&fs::read(&public_key_package_path)?)?;
    info!("Creating local commitment");
    let (nonce, commitments) =
        frost::round1::commit(key_package.signing_share(), &mut thread_rng());

    let min_cosigners = (key_package.min_signers() - 1) as usize;
    info!("{} co-signers required", min_cosigners);
    let discovery = DnsDiscovery::n0_dns();
    let endpoint = iroh::endpoint::Endpoint::builder()
        .secret_key(secret_key)
        .discovery(discovery)
        .bind()
        .await?;
    // get at least min_cosigners cosigners
    // for each cosigner, we get send and recv streams, identifier and commitments
    info!("Get commitment from {} cosigners", min_cosigners);
    let cosigners = futures::stream::iter(args.cosigners.iter())
        .map(|cosigner| send_cosign_request_round1(&endpoint, cosigner, &args.key))
        .buffer_unordered(10)
        .filter_map(|res| async {
            res.inspect_err(|e| warn!("Error sending cosign request: {:?}", e))
                .ok()
        })
        .take(min_cosigners)
        .collect::<Vec<_>>()
        .await;
    let mut commitments_map = BTreeMap::new();
    for (_, _, identifier, commitments) in cosigners.iter() {
        commitments_map.insert(*identifier, *commitments);
    }
    let local_identifier = *key_package.identifier();
    commitments_map.insert(local_identifier, commitments);
    let signing_package = frost::SigningPackage::new(commitments_map, args.message.as_bytes());
    let signing_package_bytes = signing_package.serialize()?;
    let mut signature_shares = BTreeMap::new();
    info!("Creating local signature share");
    let local_signature_share = frost::round2::sign(&signing_package, &nonce, &key_package)?;
    signature_shares.insert(local_identifier, local_signature_share);
    for (mut send, mut recv, identifier, _) in cosigners {
        write_lp(&mut send, &signing_package_bytes).await?;
        let signature_share_bytes: <<<Ed25519Sha512 as Ciphersuite>::Group as Group>::Field as Field>::Serialization = read_exact_bytes(&mut recv).await?;
        let signature_share = frost::round2::SignatureShare::deserialize(&signature_share_bytes)?;
        signature_shares.insert(identifier, signature_share);
    }
    info!("got {} signature shares", signature_shares.len());
    let signature = frost::aggregate(&signing_package, &signature_shares, &public_key_package)?;
    let bytes = signature.serialize()?;
    let iroh_signature = iroh_base::Signature::from_slice(&bytes)?;
    if let Err(cause) = key.verify(args.message.as_bytes(), &iroh_signature) {
        error!("Verification failed: {:?}", cause);
    }
    println!("Signature: {}", hex::encode(bytes));
    endpoint.close().await;
    Ok(())
}

async fn cosign_daemon(args: CosignArgs) -> anyhow::Result<()> {
    let data_path = args.data_path.unwrap_or_else(|| PathBuf::from("."));
    let secret_key = get_or_create_key(&data_path.join("keypair"))?;
    let mut keys = Vec::new();
    for entry in fs::read_dir(&data_path)? {
        let entry = entry?;
        let path = entry.path();
        if path
            .extension()
            .map(|ext| ext == "secret")
            .unwrap_or_default()
            && let Some(stem) = path.file_stem()
            && let Some(text) = stem.to_str()
        {
            let key = iroh::PublicKey::from_str(text)?;
            let secret_share_bytes = fs::read(&path)?;
            let secret_share = SecretShare::deserialize(&secret_share_bytes)?;
            let key_package = frost::keys::KeyPackage::try_from(secret_share)?;
            keys.push((key, key_package));
        }
    }
    if !keys.is_empty() {
        println!("Can cosign for following keys");
        for (key, key_package) in keys.iter() {
            println!("- {} (min {} signers)", key, key_package.min_signers());
        }
    }
    let discovery = PkarrPublisher::n0_dns().build(secret_key.clone());
    let endpoint = iroh::endpoint::Endpoint::builder()
        .alpns(vec![COSIGN_ALPN.to_vec()])
        .secret_key(secret_key)
        .discovery(discovery)
        .bind()
        .await?;
    let addr = endpoint.node_addr().initialized().await;
    println!("\nListening on {}", addr.node_id);
    while let Some(incoming) = endpoint.accept().await {
        let data_path = data_path.clone();
        tokio::task::spawn(async {
            if let Err(cause) = handle_cosign_request(incoming, data_path).await {
                tracing::error!("Error handling cosign request: {:?}", cause);
            }
        });
    }
    Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();
    match args.cmd {
        Command::Split(args) => split(args)?,
        Command::ReSplit(args) => resplit(args)?,
        Command::SignLocal(args) => sign_local(args)?,
        Command::Cosign(args) => cosign_daemon(args).await?,
        Command::Sign(args) => sign(args).await?,
    }
    Ok(())
}

fn get_or_create_key(path: &Path) -> anyhow::Result<SecretKey> {
    if path.exists() {
        let key_bytes = std::fs::read(path)?;
        Ok(try_from_openssh(key_bytes.as_slice())?)
    } else {
        let key = SecretKey::generate(rand::thread_rng());
        let key_bytes = to_openssh(&key)?;
        std::fs::write(path, &key_bytes)?;
        Ok(key)
    }
}

async fn read_exact_bytes<R: AsyncReadExt + Unpin, const N: usize>(
    reader: &mut R,
) -> anyhow::Result<[u8; N]> {
    let mut buf = [0u8; N];
    reader.read_exact(&mut buf).await?;
    Ok(buf)
}

async fn write_lp<W: AsyncWrite + Unpin>(writer: &mut W, data: &[u8]) -> anyhow::Result<()> {
    let len = data.len() as u32;
    writer.write_all(&len.to_be_bytes()).await?;
    writer.write_all(data).await?;
    Ok(())
}

async fn read_lp<R: tokio::io::AsyncRead + Unpin>(reader: &mut R) -> anyhow::Result<Vec<u8>> {
    let mut len_bytes = [0u8; 4];
    reader.read_exact(&mut len_bytes).await?;
    let len = u32::from_be_bytes(len_bytes) as usize;
    let mut data = vec![0u8; len];
    reader.read_exact(&mut data).await?;
    Ok(data)
}

/// Example copied from the frost docs
#[allow(dead_code)]
#[allow(clippy::unnecessary_cast)]
fn example() -> anyhow::Result<()> {
    let mut rng = thread_rng();
    let max_signers = 5;
    let min_signers = 3;
    let (shares, pubkey_package) = frost::keys::generate_with_dealer(
        max_signers,
        min_signers,
        frost::keys::IdentifierList::Default,
        &mut rng,
    )?;

    // Verifies the secret shares from the dealer and store them in a BTreeMap.
    // In practice, the KeyPackages must be sent to its respective participants
    // through a confidential and authenticated channel.
    let mut key_packages: BTreeMap<_, _> = BTreeMap::new();

    for (identifier, secret_share) in shares {
        let key_package = frost::keys::KeyPackage::try_from(secret_share)?;
        key_packages.insert(identifier, key_package);
    }
    println!("Key packages generated successfully!");
    for (k, v) in key_packages.iter() {
        println!("Key package for participant {k:?}: {v:?}");
    }

    let mut nonces_map = BTreeMap::new();
    let mut commitments_map = BTreeMap::new();

    ////////////////////////////////////////////////////////////////////////////
    // Round 1: generating nonces and signing commitments for each participant
    ////////////////////////////////////////////////////////////////////////////

    // In practice, each iteration of this loop will be executed by its respective participant.
    for participant_index in 1..(min_signers as u16 + 1) {
        let participant_identifier = participant_index.try_into().expect("should be nonzero");
        let key_package = &key_packages[&participant_identifier];
        // Generate one (1) nonce and one SigningCommitments instance for each
        // participant, up to _threshold_.
        let (nonces, commitments) = frost::round1::commit(key_package.signing_share(), &mut rng);
        // In practice, the nonces must be kept by the participant to use in the
        // next round, while the commitment must be sent to the coordinator
        // (or to every other participant if there is no coordinator) using
        // an authenticated channel.
        nonces_map.insert(participant_identifier, nonces);
        commitments_map.insert(participant_identifier, commitments);
    }

    // This is what the signature aggregator / coordinator needs to do:
    // - decide what message to sign
    // - take one (unused) commitment per signing participant
    let mut signature_shares = BTreeMap::new();
    let message = "message to sign".as_bytes();
    let signing_package = frost::SigningPackage::new(commitments_map, message);

    ////////////////////////////////////////////////////////////////////////////
    // Round 2: each participant generates their signature share
    ////////////////////////////////////////////////////////////////////////////

    // In practice, each iteration of this loop will be executed by its respective participant.
    for participant_identifier in nonces_map.keys() {
        let key_package = &key_packages[participant_identifier];

        let nonces = &nonces_map[participant_identifier];

        // Each participant generates their signature share.
        let signature_share = frost::round2::sign(&signing_package, nonces, key_package)?;

        // In practice, the signature share must be sent to the Coordinator
        // using an authenticated channel.
        signature_shares.insert(*participant_identifier, signature_share);
    }

    ////////////////////////////////////////////////////////////////////////////
    // Aggregation: collects the signing shares from all participants,
    // generates the final signature.
    ////////////////////////////////////////////////////////////////////////////

    // Aggregate (also verifies the signature shares)
    let group_signature = frost::aggregate(&signing_package, &signature_shares, &pubkey_package)?;

    // Check that the threshold signature can be verified by the group public
    // key (the verification key).
    let is_signature_valid = pubkey_package
        .verifying_key()
        .verify(message, &group_signature)
        .is_ok();
    assert!(is_signature_valid);
    Ok(())
}
