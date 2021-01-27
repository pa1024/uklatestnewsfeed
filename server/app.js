const express = require('express')
const request = require('request');
const app = express()
const port = 8081
const config = require('./configuration')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/*
  Returns top latest news for the UK
*/
app.get('/latest', (req, res) => {
  request(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=${config.key}`, (err, response, body) => {
    if (err) {
      return console.log(err);
    }
    const articles = JSON.parse(body).articles;
    res.send(JSON.stringify(articles))
  });
});

/*
  Returns filtered news for a query string argument q 
*/
app.get('/filter', (req, res) => {
  const query = req.query.q
  request(`https://newsapi.org/v2/everything?q=${query}&apiKey=${config.key}`, (err, response, body) => {
    if (err) {
      return console.log(err);
    }
    const articles = JSON.parse(body).articles;
    res.send(JSON.stringify(articles))
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`))