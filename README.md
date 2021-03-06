# SYMPOSIUM

### Contributors: [Aleksandar Dmitrovic](https://github.com/AleksandarDmitrovic), [Eric Mcgrandle](https://github.com/ericmcgrandle), [Josh Grant](https://github.com/JoshGrant5)

## About This Project
Symposium is the connection platform for people to discuss topics covered in the podcasts they love. Users can create discussion rooms where they can specify the conversation they want to have about a particular podcast episode and for how long the room will be open. Other users can view available conversations and join them.

This app was built for the Final Project of the Lighthouse Labs Web Development Bootcamp.

Here is the app live: https://the-symposium.herokuapp.com/

## Final Product

#### Symposium Homepage

!["Homepage"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.20.21.gif)

#### Join a conversation room

!["Conversation Room"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.21.14.gif)

#### Send a message in the chat

!["Send Chat"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.23.40.gif)

#### Search for conversations about a specific podcast

!["Search for Podcast"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.29.32.gif)

#### Create your own conversation room

!["Create a Conversation"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.30.05.gif)

#### Select a time you are available until, a podcast, and an episode to talk about

!["Select Conversation Info"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.32.52.gif)

#### Share your conversation 

!["Social Media Links"](https://github.com/AleksandarDmitrovic/symposium/blob/main/client/public/gifs/2020-12-01%2019.34.54.gif)

## Stack

### Back-End
- Node.js
- Express
- PostgreSQL

### Front-End
- React
- SCSS

## Set Up On Local Machine
This application requires two servers to run! 

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies. Run `npm run setup`
3. Copy the .env.example file and set it to .env
4. Update the .env file by filling in the database information. (Postgress was used for this project)
5. Run `npm run db:reset` to setup the database.
6. Start the express server by running `npm start` in the root directory. In another terminal run `cd client`  and then run `npm start`. The app will be served at http://localhost:3000/.


## Dependencies

- axios: 0.21.0 
- body-parser: 1.19.0 
- chalk: 4.1.0 
- cors: 2.8.5 
- dotenv: 8.2.0 
- express: 4.17.1 
- moment: 2.29.1 
- pg: 8.5.1  
- react: 17.0.1 
- react-router-dom: 5.2.0 
- sass: 1.29.0 
- simple-peer: 9.9.3 
- socket.io-client: 3.0.3 
- styled-components: 5.2.1 
- uuid: 8.3.1 
- web-vitals: 0.2.4 