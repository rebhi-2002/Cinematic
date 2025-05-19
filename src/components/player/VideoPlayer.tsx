import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Hls from 'hls.js';
import { PlaybackState } from '../../types';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
  onProgress?: (state: PlaybackState) => void;
  onEnded?: () => void;
  initialPlaybackState?: Partial<PlaybackState>;
}

export function VideoPlayer({
  url,
  poster,
  onProgress,
  onEnded,
  initialPlaybackState,
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    quality: '1080p',
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    ...initialPlaybackState,
  });

  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<number>();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'arrowleft':
          seek(-10);
          break;
        case 'arrowright':
          seek(10);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const togglePlay = () => {
    setPlaybackState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const toggleMute = () => {
    setPlaybackState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const seek = (seconds: number) => {
    const player = playerRef.current;
    if (player) {
      const newTime = player.getCurrentTime() + seconds;
      player.seekTo(newTime, 'seconds');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setPlaybackState(prev => ({ ...prev, isFullscreen: true }));
    } else {
      document.exitFullscreen();
      setPlaybackState(prev => ({ ...prev, isFullscreen: false }));
    }
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    const newState: PlaybackState = {
      ...playbackState,
      currentTime: state.playedSeconds,
    };
    setPlaybackState(newState);
    onProgress?.(newState);
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (playbackState.isPlaying) {
        setIsControlsVisible(false);
      }
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playbackState.isPlaying && setIsControlsVisible(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playbackState.isPlaying}
        volume={playbackState.volume}
        muted={playbackState.isMuted}
        progressInterval={1000}
        onProgress={handleProgress}
        onEnded={onEnded}
        config={{
          file: {
            forceHLS: true,
            hlsOptions: {
              enableWorker: true,
              startLevel: 2,
            },
          },
        }}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="absolute bottom-16 left-0 right-0 h-1 bg-gray-600">
          <div
            className="h-full bg-primary"
            style={{
              width: `${(playbackState.currentTime / playbackState.duration) * 100}%`,
            }}
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-primary transition-colors"
          >
            {playbackState.isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="text-white hover:text-primary transition-colors"
          >
            {playbackState.isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </button>

          <div className="text-white text-sm">
            {formatTime(playbackState.currentTime)} /{' '}
            {formatTime(playbackState.duration)}
          </div>

          <div className="flex-grow" />

          <button
            onClick={() => {}}
            className="text-white hover:text-primary transition-colors"
          >
            <Settings className="h-6 w-6" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary transition-colors"
          >
            {playbackState.isFullscreen ? (
              <Minimize className="h-6 w-6" />
            ) : (
              <Maximize className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}