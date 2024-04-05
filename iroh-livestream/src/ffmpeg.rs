use std::process::Stdio;

use anyhow::{bail, Context, Result};
use tokio::{
    io::{AsyncRead, AsyncWrite},
    process::{Child, Command},
};
use tracing::{info, warn};

pub fn capture_stdin() -> Result<impl AsyncRead + Send + Unpin + 'static> {
    let input = ["-i", "pipe:"];
    capture_ffmpeg(input.to_vec())
}

pub fn capture_camera() -> Result<impl AsyncRead + Send + Unpin + 'static> {
    let input = match std::env::consts::OS {
        // TODO: this is same as desktop, find out if we can find the correct device
        "macos" => vec!["-f", "avfoundation", "-i", "default:default", "-r", "30"],
        "linux" => vec![
            "-f",
            "pulse",
            "-ac",
            "2",
            "-i",
            "default",
            "-f",
            "v4l2",
            "-i",
            "/dev/video0",
            "-r",
            "30",
        ],
        "windows" => {
            // TODO: find out how windows dshow args work
            // likely have to get device name from `ffmpeg -list_devices`
            bail!("windows is not yet supported");
        }
        _ => bail!("Unsupported OS".to_string()),
    };
    capture_ffmpeg(input)
}

pub fn capture_desktop() -> Result<impl AsyncRead + Send + Unpin + 'static> {
    let input = match std::env::consts::OS {
        // TODO: this is same as camera, find out if we can find the correct device
        "macos" => vec!["-f", "avfoundation", "-i", "default:default", "-r", "30"],
        "linux" => vec![
            "-f",
            "pulse",
            "-ac",
            "2",
            "-i",
            "default",
            "-framerate",
            "30",
            "-f",
            "x11grab",
            "-i",
            ":0.0",
        ],
        "windows" => {
            vec!["-f", "dshow", "-i", "video='screen-capture-recorder'"]
        }
        _ => bail!("Unsupported OS".to_string()),
    };
    capture_ffmpeg(input)
}

pub fn capture_ffmpeg(input: Vec<&'static str>) -> Result<impl AsyncRead + Send + Unpin + 'static> {
    let bin = match std::env::consts::OS {
        "windows" => "ffmpeg.exe",
        _ => "ffmpeg",
    };
    let encode_video = [
        "-vcodec",
        "libx264",
        "-preset",
        "fast",
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
    args.extend_from_slice(&input);
    args.extend_from_slice(&encode_video);
    args.extend_from_slice(&output);

    info!("spawn: {} {}", bin, args.join(" "));
    let mut cmd = Command::new(bin);
    cmd.args(args);
    cmd.stdout(Stdio::piped());
    let mut child = cmd.spawn()?;
    let stdout = child
        .stdout
        .take()
        .context("failed to capture FFmpeg stdout")?;
    tokio::spawn(wait_and_log(bin, child));
    Ok(stdout)
}

pub fn out_ffplay() -> Result<impl AsyncWrite + Send + Unpin + 'static> {
    let bin = match std::env::consts::OS {
        "windows" => "ffplay.exe",
        _ => "ffplay",
    };
    // TODO: Find out if this actually helps, found it on the internets..
    let args = [
        "-nostats",
        "-sync",
        "ext",
        "-max_delay",
        "0",
        "-analyzeduration",
        "0",
        "-flags",
        "+low_delay",
        "-fflags",
        "+nobuffer+fastseek+flush_packets",
        "-",
    ];

    info!("spawn: {} {}", bin, args.join(" "));
    let mut cmd = Command::new(bin);
    cmd.args(args);
    cmd.stdin(Stdio::piped());
    let mut child = cmd.spawn()?;
    let stdin = child.stdin.take().context("failed to capture stdin")?;
    tokio::spawn(wait_and_log(bin, child));
    Ok(stdin)
}

pub fn out_mpv() -> Result<impl AsyncWrite + Send + Unpin + 'static> {
    let bin = match std::env::consts::OS {
        "windows" => "mpv.exe",
        _ => "mpv",
    };
    let args = ["--profile=low-latency", "--no-cache", "--untimed", "-"];

    info!("spawn: {} {}", bin, args.join(" "));
    let mut cmd = Command::new(bin);
    cmd.args(args);
    cmd.stdin(Stdio::piped());
    let mut child = cmd.spawn()?;
    let stdin = child.stdin.take().context("failed to capture stdin")?;
    tokio::spawn(wait_and_log(bin, child));
    Ok(stdin)
}

async fn wait_and_log(name: &str, mut child: Child) {
    let status = child.wait().await;
    match status {
        Ok(status) => info!("{name} exited with status {status}"),
        Err(err) => warn!("{name} exited with error {err}"),
    }
}

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
