import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

// const VIDEO_SRC = "https://cdn-s01.mywallpaper-4k-image.net/stream/c/clevatess-majuu-no-ou-to-akago-to-shikabane-no-yuusha-dublado/12.mp4/index.m3u8";
const VIDEO_SRC = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const VolumeIcon = ({ size = 24, muted = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#fff"/>
        {!muted && (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" fill="#fff"/>
        )}
    </svg>
);

function formatTime(sec: number) {
    if (!isFinite(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

const VideoPlayer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [volume, setVolume] = useState(1);
    const [showVolumeBar, setShowVolumeBar] = useState(false);
    const [hoverVolumeBar, setHoverVolumeBar] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = VIDEO_SRC;
        } else if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(VIDEO_SRC);
            hls.attachMedia(video);
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);
        const updateBuffered = () => {
            if (video.buffered.length) {
                setBuffered(video.buffered.end(video.buffered.length - 1));
            }
        };

        video.addEventListener("timeupdate", updateTime);
        video.addEventListener("loadedmetadata", updateDuration);
        video.addEventListener("progress", updateBuffered);

        return () => {
            video.removeEventListener("timeupdate", updateTime);
            video.removeEventListener("loadedmetadata", updateDuration);
            video.removeEventListener("progress", updateBuffered);
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFs =
                document.fullscreenElement === containerRef.current ||
                (document as any).webkitFullscreenElement === containerRef.current;
            setIsFullscreen(isFs);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
        };
    }, []);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const seekTime = percent * duration;
        const video = videoRef.current;
        if (video) video.currentTime = seekTime;
    };

    const handleProgressHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        setHoverTime(percent * duration);
    };

    const handleProgressLeave = () => setHoverTime(null);

    const handleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;
        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if ((container as any).webkitRequestFullscreen) {
                (container as any).webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            }
        }
    };

    const handleVolumeBar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newVolume = Math.max(0, Math.min(1, percent));
        const video = videoRef.current;
        if (video) {
            video.volume = newVolume;
            setVolume(newVolume);
        }
    };

    // Mostra controles se mouse está sobre ou vídeo está pausado
    const controlsVisible = showControls || isFullscreen || !isPlaying;

    // Estilos
    const buttonStyle = {
        color: "#fff",
        background: "none",
        border: "none",
        fontSize: isFullscreen ? "28px" : "20px",
        cursor: "pointer",
        padding: "6px",
        borderRadius: "50%",
        transition: "background 0.2s",
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
    };

    const tooltipStyle = {
        position: "absolute" as const,
        bottom: "110%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#222",
        color: "#fff",
        padding: "3px 8px",
        borderRadius: "4px",
        fontSize: "13px",
        whiteSpace: "nowrap" as const,
        pointerEvents: "none" as const,
        opacity: 0.9,
        zIndex: 10,
    };

    return (
        <div
            ref={containerRef}
            style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#000",
            zIndex: 9999,
            }}
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <video
            ref={videoRef}
            controls={false}
            style={{
                width: "100vw",
                height: "100vh",
                // objectFit: "cover",
                background: "#000",
            }}
            />
            {controlsVisible && (
            <div
                style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                // background: "rgba(20,20,20,0.7)",
                padding: isFullscreen ? "24px 12px 18px 12x" : "16px 12px 10px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-end",
                gap: isFullscreen ? 18 : 10,
                // boxShadow: "0 -2px 16px #000a",
                transition: "padding 0.2s",
                }}
            >
                {/* Progress Bar logo acima dos botões */}
                <div
                className="px-72"
                style={{
                    width: "100%",
                    height: isFullscreen ? 14 : 9,
                    background: "#222",
                    borderRadius: 6,
                    cursor: "pointer",
                    position: "relative",
                    // padding: isFullscreen ? "0 32px" : "0 16px",
                    marginBottom: isFullscreen ? 18 : 10,
                    boxShadow: "0 2px 8px #0006",
                }}
                onClick={handleSeek}
                onMouseMove={handleProgressHover}
                onMouseLeave={handleProgressLeave}
                onMouseEnter={() => setHoveredButton("seek")}
                >
                {/* Buffer Bar */}
                <div
                    style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${(buffered / duration) * 100}%`,
                    background: "#444",
                    borderRadius: 6,
                    zIndex: 1,
                    }}
                />
                {/* Progress Bar */}
                <div
                    style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${(currentTime / duration) * 100}%`,
                    background: "#e74c3c",
                    borderRadius: 6,
                    zIndex: 2,
                    transition: "width 0.2s",
                    }}
                />
                {/* Current Time Circle */}
                <div
                    style={{
                    position: "absolute",
                    left: `calc(${(currentTime / duration) * 100}% - ${(isFullscreen ? 12 : 8) / 2}px)`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: isFullscreen ? 19 : 15,
                    height: isFullscreen ? 19 : 15,
                    background: "#fff",
                    border: "2px solid #e74c3c",
                    borderRadius: "50%",
                    zIndex: 3,
                    boxShadow: "0 0 2px #e74c3c",
                    }}
                />
                {/* Tooltip on hover */}
                {hoverTime !== null && (
                    <span
                    style={{
                        ...tooltipStyle,
                        left: `${(hoverTime / duration) * 100}%`,
                        bottom: "150%",
                        fontSize: "12px",
                        background: "#333",
                    }}
                    >
                    {formatTime(hoverTime)}
                    </span>
                )}
                {hoveredButton === "seek" && hoverTime === null && (
                    <span style={tooltipStyle}>Seek</span>
                )}
                </div>
                {/* Linha dos botões */}
                <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0,
                }}
                >
                {/* Lado esquerdo: Play/Pause, Volume, Tempo */}
                <div
                    style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: isFullscreen ? 24 : 14,
                    marginLeft: isFullscreen ? 32 : 16,
                    }}
                >
                    {/* Play/Pause Button */}
                    <div
                    style={{ position: "relative" }}
                    onMouseEnter={() => setHoveredButton("playpause")}
                    onMouseLeave={() => setHoveredButton(null)}
                    >
                    <button
                        onClick={handlePlayPause}
                        style={{
                        ...buttonStyle,
                        background: hoveredButton === "playpause" ? "#222" : "none",
                        }}
                    >
                        {isPlaying ? (
                        <svg width={22} height={22} viewBox="0 0 22 22">
                            <rect x="4" y="4" width="4" height="14" rx="2" fill="#fff" />
                            <rect x="14" y="4" width="4" height="14" rx="2" fill="#fff" />
                        </svg>
                        ) : (
                        <svg width={22} height={22} viewBox="0 0 22 22">
                            <polygon points="5,4 18,11 5,18" fill="#fff" />
                        </svg>
                        )}
                    </button>
                    {hoveredButton === "playpause" && (
                        <span style={tooltipStyle}>{isPlaying ? "Pause" : "Play"}</span>
                    )}
                    </div>
                    {/* Volume Button + Bar */}
<div
  style={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    transition: "padding-right 0.3s ease",
    paddingRight: showVolumeBar || hoverVolumeBar ? "6px" : "5px", // menos espaço
  }}
  onMouseEnter={() => {
    setShowVolumeBar(true);
    setHoveredButton("volume");
    setHoverVolumeBar(true);
  }}
  onMouseLeave={() => {
    setShowVolumeBar(false);
    setHoveredButton(null);
    setHoverVolumeBar(false);
  }}
>
  {/* Botão de Volume */}
  <button
    style={{
      ...buttonStyle,
      background: hoveredButton === "volume" ? "#222" : "none",
      zIndex: 2,
    }}
    onClick={() => setShowVolumeBar((v) => !v)}
  >
    <VolumeIcon size={isFullscreen ? 26 : 18} muted={volume === 0} />
  </button>

  {/* Tooltip */}
  {(hoveredButton === "volume" || hoverVolumeBar) && (
    <span style={tooltipStyle}>Volume</span>
  )}

  {/* Barra de Volume estilo YouTube */}
  <div
    style={{
      marginLeft: "8px", // colada ao botão
      width: showVolumeBar || hoverVolumeBar ? (isFullscreen ? 120 : 80) : 0,
      height: isFullscreen ? 8 : 6,
      background: "#222",
      borderRadius: 4,
      boxShadow: "0 2px 8px #0008",
      opacity: showVolumeBar || hoverVolumeBar ? 1 : 0,
      transition: "width 0.3s ease, opacity 0.3s ease",
      overflow: "hidden",
      cursor: "pointer",
      pointerEvents: showVolumeBar || hoverVolumeBar ? "auto" : "none",
    }}
    onClick={handleVolumeBar}
    onMouseEnter={() => setHoverVolumeBar(true)}
    onMouseLeave={() => setHoverVolumeBar(false)}
  >
    <div
      style={{
        height: "100%",
        width: `${volume * 100}%`,
        background: "#fff",
        borderRadius: 4,
        transition: "width 0.2s",
      }}
    />
  </div>
</div>

{/* Tempo */}
  <span
    style={{
      color: "#fff",
      fontSize: isFullscreen ? "18px" : "15px",
      minWidth: 70,
      fontFamily: "monospace",
      letterSpacing: 1,
    //   marginLeft: showVolumeBar || hoverVolumeBar ? 12 : 10,
      marginLeft: 0,
      transition: "margin-left 0.3s ease",
    }}
  >
    {formatTime(currentTime)} / {formatTime(duration)}
  </span>
                </div>
                {/* Lado direito: Fullscreen */}
                <div
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    minWidth: isFullscreen ? 60 : 40,
                    marginRight: isFullscreen ? 32 : 16,
                    }}
                >
                    <div
                    style={{ position: "relative" }}
                    onMouseEnter={() => setHoveredButton("fullscreen")}
                    onMouseLeave={() => setHoveredButton(null)}
                    >
                    <button
                        onClick={handleFullscreen}
                        style={{
                        ...buttonStyle,
                        background: hoveredButton === "fullscreen" ? "#222" : "none",
                        }}
                    >
                        {isFullscreen ? (
                        <svg width={22} height={22} viewBox="0 0 22 22">
                            <rect x="6" y="6" width="10" height="10" rx="2" fill="#fff" />
                        </svg>
                        ) : (
                        <svg width={22} height={22} viewBox="0 0 22 22">
                            <rect x="3" y="3" width="16" height="16" rx="3" stroke="#fff" strokeWidth="2" fill="none" />
                        </svg>
                        )}
                    </button>
                    {hoveredButton === "fullscreen" && (
                        <span style={tooltipStyle}>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
                    )}
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default VideoPlayer;
