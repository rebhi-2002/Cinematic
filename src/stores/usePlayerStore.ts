import { create } from 'zustand';
import { PlaybackState } from '../types';

interface PlayerState {
  playbackState: PlaybackState;
  isFullscreen: boolean;
  showControls: boolean;
  quality: '480p' | '720p' | '1080p' | '4K';
  subtitles: string[];
  selectedSubtitle: string | null;
  audioTracks: string[];
  selectedAudioTrack: string | null;
  setPlaybackState: (state: Partial<PlaybackState>) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setQuality: (quality: '480p' | '720p' | '1080p' | '4K') => void;
  setSubtitle: (subtitle: string | null) => void;
  setAudioTrack: (track: string | null) => void;
  saveProgress: (mediaId: number, progress: number) => Promise<void>;
  loadProgress: (mediaId: number) => Promise<number>;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  playbackState: {
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
  },
  isFullscreen: false,
  showControls: true,
  quality: '1080p',
  subtitles: [],
  selectedSubtitle: null,
  audioTracks: [],
  selectedAudioTrack: null,

  setPlaybackState: (state) => 
    set((prev) => ({ playbackState: { ...prev.playbackState, ...state } })),

  togglePlay: () => 
    set((prev) => ({ 
      playbackState: { 
        ...prev.playbackState, 
        isPlaying: !prev.playbackState.isPlaying 
      } 
    })),

  toggleMute: () => 
    set((prev) => ({ 
      playbackState: { 
        ...prev.playbackState, 
        isMuted: !prev.playbackState.isMuted 
      } 
    })),

  toggleFullscreen: () => 
    set((prev) => ({ 
      isFullscreen: !prev.isFullscreen,
      playbackState: { 
        ...prev.playbackState, 
        isFullscreen: !prev.isFullscreen 
      } 
    })),

  setQuality: (quality) => set({ quality }),
  setSubtitle: (subtitle) => set({ selectedSubtitle: subtitle }),
  setAudioTrack: (track) => set({ selectedAudioTrack: track }),

  saveProgress: async (mediaId, progress) => {
    // TODO: Implement with Supabase
    localStorage.setItem(`progress-${mediaId}`, progress.toString());
  },

  loadProgress: async (mediaId) => {
    // TODO: Implement with Supabase
    return parseFloat(localStorage.getItem(`progress-${mediaId}`) || '0');
  },
}));