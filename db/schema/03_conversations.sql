DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  conversation_url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  available_until INTEGER NOT NULL,
  podcast_name TEXT NOT NULL,
  podcast_image TEXT NOT NULL,
  podcast_episode_title TEXT NOT NULL,
  podcast_episode_embed_url TEXT NOT NULL
);