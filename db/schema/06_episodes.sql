DROP TABLE IF EXISTS episodes CASCADE;

CREATE TABLE episodes (
  id SERIAL PRIMARY KEY NOT NULL,
  podcast_name TEXT NOT NULL,
  podcast_image TEXT NOT NULL,
  embed_title TEXT NOT NULL, 
  embed_url TEXT NOT NULL
);