const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const podcastCategorySearch = async(podcastName) => {

    const results = await db.query(`
    SELECT id FROM categories
    WHERE name = $1;
    `, [podcastName])
      .then(res => {
        return res.rows[0].id;
      })
      .catch(() => {
        return 1; // Initialized as Other catagory category id = 1
      });

    return results;
  };

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

  router.get("/conversations/:url", (req, res) => {
    db.query(`SELECT * FROM conversations 
              WHERE conversations.conversation_url = $1;`, [req.params.url])
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
    const name = req.params.name.split('+').join(' ');
    db.query(`SELECT * FROM conversations WHERE podcast_name = $1;`, [name])
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

  router.get("/categories/:id", (req, res) => {
    const categoryID = parseInt(req.params.id);
    console.log('req.params.id :', typeof parseInt(req.params.id));
    db.query(`SELECT name FROM categories
              WHERE id = $1;`, [categoryID])
      .then(data => {
        const categoryName = data.rows[0];
        res.json({ categoryName });
      });
  });

  // router.put for creating a new room
  router.put('/conversations', (req, res) => {
    const { title, description, url, podcastInfo } = req.body;
    
    podcastCategorySearch(podcastInfo.category).then(categoryFound => {
      const creatorID = 1;
      const categoryID = categoryFound;
      const podcastName = podcastInfo.podcast_name;
      const podcastImage = podcastInfo.podcast_image;
      
      // Left to implement
      const podcastStartsAt = "TEXT";
      const podcastEndsAt = "TEXT";

      const queryParams =
      [creatorID, categoryID, url, title, description, podcastName, podcastStartsAt, podcastEndsAt, podcastImage];
      
      const queryString = `
      INSERT INTO conversations (creator_id, category_id, conversation_url, title, description, podcast_name, podcast_starts_at, podcast_ends_at, podcast_image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;`;
  
      db.query(queryString, queryParams)
        .then((data) => {
          const conversation = data.rows;
          res.json({ conversation });
          // res.status(201).json({});
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });



  });
  // router.post for deleting a room

  return router;
};