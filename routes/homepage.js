const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/conversations", (req, res) => {
    db.query(`SELECT * FROM conversations;`)
      .then(data => {
        const conversation = data.rows;
        res.json({ conversation });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/conversations/category/:id", (req, res) => {
    db.query(`SELECT * FROM conversations 
              JOIN categories ON categories.id = category_id
              WHERE conversations.category_id = $1;`, [req.params.id])
      .then(data => {
        const conversation = data.rows;
        res.json({ conversation });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/conversations/podcast/:name", (req, res) => {
    db.query(`SELECT * FROM conversations WHERE podcast_name = $1;`, [req.params.name])
      .then(data => {
        const conversation = data.rows;
        res.json({ conversation });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.put for creating a new room
  router.put('/conversations', (req, res) => {
    // console.log('req body:', req.body);

    const creatorID = 1;
    const categoryID = 1;
    const podcastName = "Podcast Sample";
    const podcastStartsAt = "TEXT";
    const podcastEndsAt = "TEXT";
    const podcastImage = "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";

    const { title, description, url } = req.body;
    
    
    const queryParams = [creatorID, categoryID, title, description, podcastName, podcastStartsAt, podcastEndsAt, podcastImage];
    const queryString = `
    INSERT INTO conversations (creator_id, category_id, title, description, podcast_name, podcast_starts_at, podcast_ends_at, podcast_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;`;

    db.query(queryString, queryParams)
      .then((data) => {
        const conversation = data.rows;
        // console.log('conversation :', conversation);
        // res.json({ conversation });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // router.post for deleting a room

  return router;
};