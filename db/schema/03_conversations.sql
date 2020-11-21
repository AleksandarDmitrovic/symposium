DROP TABLE IF EXISTS conversations CASCADE;

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  podcast_name VARCHAR(255) NOT NULL,
  podcast_starts_at VARCHAR(255) NOT NULL,
  podcast_ends_at VARCHAR(255) NOT NULL,
  podcast_image TEXT NOT NULL
);