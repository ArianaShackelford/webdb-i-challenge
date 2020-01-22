const express = require('express');

const db = require('./data/dbConfig.js');
const router = require('./api/router.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', router);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: "Something went wrong"})
})

server.get('/', (req, res) => {
    res.send(`<h2>Your server is running!</h2>`);
  });
  

module.exports = server;