use std::process::Stdio;

use anyhow::{bail, Context, Result};
use tokio::{
    io::{AsyncRead, AsyncWrite},
    process::Command,
};
use tracing::{info, warn};

// pub async fn ensure_ffmpeg_installed() -> anyhow::Result<()> {
//     use ffmpeg_sidecar::{command::ffmpeg_is_installed, paths::ffmpeg_path, version::ffmpeg_version};
//     if !ffmpeg_is_installed() {
//         tracing::info!("FFmpeg not found, downloading...");
//         tokio::task::spawn_blocking(|| {
//             ffmpeg_sidecar::download::auto_download().map_err(|e| anyhow!(format!("{e}")))
//         })
//         .await??;
//     }
//     let version = ffmpeg_version().map_err(|e| anyhow!(format!("{e}")))?;
//     println!("FFmpeg version: {}", version);
//     Ok(())
// }

pub fn publish() -> Result<impl AsyncRead + Send + Unpin + 'static> {
    // let bin = ffmpeg_path();
    let bin = "ffmpeg";
    let input = match std::env::consts::OS {
        "macos" => vec!["-f", "avfoundation", "-i", "default:default", "-r", "30"],
        "linux" => vec![
            "-f",
            "v4l2",
            "-i",
            "/dev/video0",
            "-r",
            "30",
            "-f",
            "pulse",
            "-ac",
            "2",
            "-i",
            "default",
        ],
        "windows" => {
            // TODO: find out how windows dshow args work
            // likely have to get device name from `ffmpeg -list_devices`
            bail!("windows is not yet supported");
        }
        _ => bail!("Unsupported OS".to_string()),
    };
    // TODO: Find out if this actually helps, found it on the internets..
    let reduce_latency = [
        "-max_delay",
        "0",
        "-analyzeduration",
        "0",
        "-flags",
        "+low_delay",
        "-fflags",
        "+nobuffer",
    ];
    let encode = [
        "-vcodec",
        "libx264",
        "-preset",
        "ultrafast",
        "-tune",
        "zerolatency",
    ];
    // taken from moq-rs/dev/pub
    let output = [
        "-f",
        "mp4",
        "-movflags",
        "cmaf+separate_moof+delay_moov+skip_trailer",
        "-frag_duration",
        "1",
        "-",
    ];
    let mut args = vec!["-hide_banner", "-v", "quiet"];
    args.extend_from_slice(&reduce_latency);
    args.extend_from_slice(&input);
    args.extend_from_slice(&encode);
    args.extend_from_slice(&output);

    info!(
        "spawning ffmpeg: {} {}",
        bin,
        args.join(" ")
    );
    let mut cmd = Command::new(bin);
    cmd.args(args);
    cmd.stdout(Stdio::piped());
    let mut child = cmd.spawn()?;
    let stdout = child
        .stdout
        .take()
        .context("failed to capture FFmpeg stdout")?;
    // Ensure the child process is spawned in the runtime so it can
    // make progress on its own while we await for any output.
    tokio::spawn(async move {
        let status = child.wait().await;
        match status {
            Ok(status) => info!("FFmpeg exited with status {status}"),
            Err(err) => warn!("FFmpeg exited with error {err}"),
        }
    });
    Ok(stdout)
}

pub fn subscribe() -> Result<impl AsyncWrite + Send + Unpin + 'static> {
    let bin = "ffplay";
    let args = ["-"];

    let mut cmd = Command::new(bin);
    cmd.args(args);
    cmd.stdin(Stdio::piped());
    let mut child = cmd.spawn()?;
    let stdin = child
        .stdin
        .take()
        .context("failed to capture FFmpeg stdout")?;
    // Ensure the child process is spawned in the runtime so it can
    // make progress on its own while we await for any output.
    tokio::spawn(async move {
        let status = child.wait().await;
        match status {
            Ok(status) => info!("ffplay exited with status {status}"),
            Err(err) => warn!("ffplay exited with error {err}"),
        }
    });
    Ok(stdin)
}
