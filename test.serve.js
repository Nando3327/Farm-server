var express = require('express')
var http = require('http')
var app = express()

app.get('/', (req, res) => {
    res.status(200).send("Welcome to tests")
  })

  http.createServer(app).listen(8003, () => {
    console.log('Server started at http://localhost:8003');
  });
