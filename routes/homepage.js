const axios = require('axios');
const express = require('express');
const router = express.Router();

module.exports = (db, updateConversations) => {
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
    db.query(`SELECT * FROM conversations
              ORDER BY id DESC;`)
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
              WHERE conversations.category_id = $1
              ORDER BY conversations.id DESC;`, [req.params.id])
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
    db.query(`SELECT * FROM conversations 
              WHERE podcast_name = $1
              ORDER BY id DESC;`, [name])
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
    
    db.query(`SELECT name FROM categories
              WHERE id = $1;`, [categoryID])
      .then(data => {
        const categoryName = data.rows[0];
        res.json({ categoryName });
      });
  });

  // router.put for creating a new room
  router.put('/conversations', (req, res) => {
    const { title, description, timeAvailable, url, podcastInfo, embedTitle, embedUrl } = req.body;
    
    podcastCategorySearch(podcastInfo.category).then(categoryFound => {
      const creatorID = 1;

      const isActive = true;
      const categoryID = categoryFound;
  
  
      const podcastName = podcastInfo.podcast_name;
      const podcastStartsAt = "TEXT";
      const podcastEndsAt = "TEXT";
      const podcastImage = podcastInfo.podcast_image;
  
      const queryParams = [creatorID, isActive, categoryID, url, title, description, timeAvailable, podcastName, podcastStartsAt, podcastEndsAt, podcastImage, embedTitle, embedUrl];
      const queryString = `
      INSERT INTO conversations (creator_id, is_active, category_id, conversation_url, title, description, available_until, podcast_name, podcast_starts_at, podcast_ends_at, podcast_image, podcast_episode_title, podcast_episode_embed_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;`;
  
      db.query(queryString, queryParams)
        .then((data) => {
          const conversationID = data.rows[0].id;

      
          res.json({ conversationID });
          // updateConversations(Number(conversationID));
       
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
    
  });

  // Changes a conversation to inactive
  router.put('/conversations/inactive', (req, res) => {
    const { active, id } = req.body;

    const queryParams = [active, id];
    const queryString = `
    UPDATE conversations
    SET is_active = $1
    WHERE id = $2
    RETURNING *;`;

    db.query(queryString, queryParams)
      .then((data) => {
        const conversation = data.rows;
        res.json({ conversation });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Fetches podcast info from Itunes API
  router.get("/itunes/:podcast", (req, res) => {
    const { podcast } = req.params;
    const url = `https://itunes.apple.com/search?term=${podcast}&entity=podcast&limit=20`;
    axios.get(url)
      .then(response => {
        res.json(response.data.results);
      })
      .catch(err => console.log('Error: ', err));
  });

  // Make second api call for specific podcast episodes
  router.get("/episodes/:feedUrl", (req, res) => {
    const { feedUrl } = req.params;
    const url =  `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}&${process.env.API_KEY}`;
    axios.get(url)
      .then(response => {
        const episodeData = response.data.items.map(ep => {
          return {embed_title: ep.title, embed_url: ep.enclosure.link};
        });
        res.json(episodeData);
      })
      .catch(err => console.log('Error:', err));
  });

  // Podcast fetched as the "Podcast of the Day"
  router.get("/podcastOfDay", (req, res) => {
    db.query(`
            SELECT podcast_episode_embed_url, podcast_episode_title, podcast_name, COUNT(*) as count
            FROM conversations
            GROUP BY podcast_episode_embed_url, podcast_episode_title, podcast_name
            ORDER BY count DESC
            LIMIT 1;`
    ).then(data => {
      res.json(data.rows[0]);
    }).catch(err => console.log('Error:', err))
  });
 
  return router;
};