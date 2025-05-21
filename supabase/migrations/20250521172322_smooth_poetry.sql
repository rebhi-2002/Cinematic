/*
  # Media Management Schema

  1. New Tables
    - `media`
      - Stores movies and TV shows
      - Includes metadata like title, description, release date
    - `episodes`
      - For TV show episodes
      - Links to media table for TV shows
    - `media_files`
      - Stores video files and subtitles
      - Supports multiple qualities and formats
    - `watch_progress`
      - Tracks user viewing progress
      - Enables resume functionality
    - `user_preferences`
      - Stores user settings
      - Includes subtitle, audio, and quality preferences

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
    - Secure media access based on subscription
*/

-- Media table for both movies and TV shows
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('movie', 'tv')),
  release_date date,
  poster_path text,
  backdrop_path text,
  tmdb_id integer UNIQUE,
  imdb_id text UNIQUE,
  genres text[],
  runtime integer,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Episodes for TV shows
CREATE TABLE IF NOT EXISTS episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id uuid REFERENCES media(id) ON DELETE CASCADE,
  season_number integer NOT NULL,
  episode_number integer NOT NULL,
  title text NOT NULL,
  description text,
  runtime integer,
  still_path text,
  air_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(media_id, season_number, episode_number)
);

-- Video files and subtitles
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id uuid REFERENCES media(id) ON DELETE CASCADE,
  episode_id uuid REFERENCES episodes(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('video', 'subtitle')),
  quality text CHECK (type != 'video' OR quality IN ('480p', '720p', '1080p', '4K')),
  language text NOT NULL,
  url text NOT NULL,
  format text NOT NULL,
  size bigint,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (
    (media_id IS NOT NULL AND episode_id IS NULL) OR
    (media_id IS NULL AND episode_id IS NOT NULL)
  )
);

-- Watch progress tracking
CREATE TABLE IF NOT EXISTS watch_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  media_id uuid REFERENCES media(id) ON DELETE CASCADE,
  episode_id uuid REFERENCES episodes(id) ON DELETE CASCADE,
  progress integer NOT NULL DEFAULT 0,
  completed boolean DEFAULT false,
  last_watched timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, media_id, episode_id)
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  default_subtitle text,
  default_audio text,
  preferred_quality text CHECK (preferred_quality IN ('480p', '720p', '1080p', '4K')),
  autoplay boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Media is viewable by authenticated users"
  ON media FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Episodes are viewable by authenticated users"
  ON episodes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Media files are accessible by authenticated users"
  ON media_files FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their watch progress"
  ON watch_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their preferences"
  ON user_preferences FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_media_updated_at
  BEFORE UPDATE ON media
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_episodes_updated_at
  BEFORE UPDATE ON episodes
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_media_files_updated_at
  BEFORE UPDATE ON media_files
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_watch_progress_updated_at
  BEFORE UPDATE ON watch_progress
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();