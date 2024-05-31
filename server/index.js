require("dotenv").config();
const express = require("express");
const app = express();
const cacheService = require("express-api-cache");
const NewsAPI = require("newsapi");
const cache = cacheService.cache;
const PORT = process.env.PORT || 4000;
app.use(express.static("build"));

const newsapi = new NewsAPI(process.env.API_KEY);

app.get("/api/headlines", cache("10 minutes"), async (req, res) => {
  // Do some work to retrieve movies and request before 10 minutes will get movies from cache
  const data = await newsapi.v2.topHeadlines({
    language: "en",
    country: "in",
  });
  res.json(data.articles);
});

app.listen(PORT, function () {
  console.log(`Example app listening on ${PORT}!`);
});
