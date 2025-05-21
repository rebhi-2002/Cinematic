import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { PlaybackState } from '../../types';
import 'plyr/dist/plyr.css';

interface AdvancedPlayerProps {
  url: string;
  poster?: string;
  subtitles?: Array<{
    src: string;
    label: string;
    language: string;
  }>;
  qualities?: Array<{
    src: string;
    quality: string;
  }>;
  onProgress?: (state: PlaybackState) => void;
  onEnded?: () => void;
  initialPlaybackState?: Partial<PlaybackState>;
}

export function AdvancedPlayer({
  url,
  poster,
  subtitles = [],
  qualities = [],
  onProgress,
  onEnded,
  initialPlaybackState,
}: AdvancedPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();
  const hlsRef = useRef<Hls>();
  
  const [isReady, setIsReady] = useState(false);
  const { playbackState, setPlaybackState } = usePlayerStore();

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Plyr
    const player = new Plyr(videoRef.current, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'airplay',
        'fullscreen',
      ],
      settings: ['captions', 'quality', 'speed'],
      quality: {
        default: initialPlaybackState?.quality || '1080p',
        options: qualities.map(q => q.quality),
      },
      captions: { active: true, language: 'auto', update: true },
    });

    playerRef.current = player;

    // Initialize HLS if supported
    if (Hls.isSupported()) {
      const hls = new Hls({
        maxLoadingDelay: 4,
        defaultAudioCodec: 'mp4a.40.2',
        enableWorker: true,
      });

      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsReady(true);
        
        // Set initial quality
        const levels = hls.levels;
        const defaultQuality = initialPlaybackState?.quality || '1080p';
        const qualityIndex = levels.findIndex(level => 
          level.height === parseInt(defaultQuality.replace('p', ''))
        );
        
        if (qualityIndex !== -1) {
          hls.currentLevel = qualityIndex;
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              initPlayer();
              break;
          }
        }
      });
    }
    // Fallback for browsers that don't support HLS
    else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
      setIsReady(true);
    }

    // Add event listeners
    player.on('timeupdate', () => {
      const currentTime = player.currentTime;
      const duration = player.duration;
      
      setPlaybackState({
        currentTime,
        duration,
        isPlaying: !player.paused,
      });

      onProgress?.({
        currentTime,
        duration,
        isPlaying: !player.paused,
        quality: player.quality,
        volume: player.volume,
        isMuted: player.muted,
        isFullscreen: player.fullscreen.active,
      });
    });

    player.on('ended', () => {
      onEnded?.();
    });

    player.on('qualitychange', (event) => {
      setPlaybackState({ quality: event.detail.quality });
    });

    // Cleanup
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [url]);

  // Handle subtitle tracks
  useEffect(() => {
    if (!playerRef.current || !isReady) return;

    const tracks = subtitles.map((subtitle, index) => ({
      kind: 'captions',
      label: subtitle.label,
      srclang: subtitle.language,
      src: subtitle.src,
      default: index === 0,
    }));

    if (videoRef.current) {
      // Remove existing tracks
      while (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild);
      }

      // Add new tracks
      tracks.forEach(track => {
        const trackElement = document.createElement('track');
        Object.assign(trackElement, track);
        videoRef.current?.appendChild(trackElement);
      });
    }
  }, [subtitles, isReady]);

  // Handle quality changes
  useEffect(() => {
    if (!hlsRef.current || !isReady) return;

    const hls = hlsRef.current;
    const quality = playbackState.quality;
    
    if (quality) {
      const height = parseInt(quality.replace('p', ''));
      const levelIndex = hls.levels.findIndex(level => level.height === height);
      
      if (levelIndex !== -1) {
        hls.currentLevel = levelIndex;
      }
    }
  }, [playbackState.quality, isReady]);

  return (
    <div className="relative w-full aspect-video bg-black">
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        playsInline
        crossOrigin="anonymous"
      >
        {subtitles.map((subtitle, index) => (
          <track
            key={subtitle.language}
            kind="captions"
            label={subtitle.label}
            srcLang={subtitle.language}
            src={subtitle.src}
            default={index === 0}
          />
        ))}
      </video>
    </div>
  );
}