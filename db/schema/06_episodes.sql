DROP TABLE IF EXISTS episodes CASCADE;

CREATE TABLE episodes (
  id SERIAL PRIMARY KEY NOT NULL,
  podcast_name TEXT NOT NULL,
  podcast_image TEXT NOT NULL,
  episode_name TEXT NOT NULL, 
  url TEXT NOT NULL
);