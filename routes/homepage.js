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

  // router.post for creating a new room
  router.put('/conversations', (req, res) => {
    console.log('req :', req);
    res.status(204).json({});
    


    let creatorID = 1;
    const { title, description, podcastName, url } = req.body;
    
    
    const queryParams = [creatorID, title, description, podcastName, url];
    // const queryString = `
    // INSERT INTO users (name, email, password)
    // VALUES ($1, $2, $3)
    // RETURNING *;`;

    // db.query(queryString, queryParams)
    //   .then((data) => {
    //     id = data.rows[0].id;
    //     req.session.user_id = id;
    //     res.redirect('/');
    //   })
    //   .catch((err) => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });
  // router.post for deleting a room

  return router;
};