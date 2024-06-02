import dotenv from "dotenv";
dotenv.config();
import express from "express";
import NewsAPI, { ApiNewsCountry } from "ts-newsapi";
import memoryCache from "memory-cache";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.static("build/client"));

const newsapi = new NewsAPI(process.env.API_KEY as string);

app.get("/api/headlines", async (req, res) => {
  try {
    const pageNo = parseInt(req.query.pageNo as string) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize as string) || 5; // Default page size
    const country: ApiNewsCountry = req.query.country as ApiNewsCountry;

    const start = (pageNo - 1) * pageSize;
    const end = start + pageSize;
    const pageCachedData = JSON.parse(
      memoryCache.get(`headlines-${pageNo}-${pageSize}-${country}`)
    );

    if (pageCachedData) {
      console.log("Headlines retrieved from cache (page:", pageNo, ")");
      if (pageCachedData.length === 0) {
        res.status(406).json({ error: "OutOfBound", status: "Error" });
        return;
      }
      res.status(200).json(pageCachedData);
      return;
    }
    console.log(`Page Number:  ${pageNo} Not cached`);

    console.log("checking newsapi cache....");
    const cachedData = JSON.parse(memoryCache.get(`headlines-${country}`));
    if (cachedData) {
      console.log("Headlines retrieved from newsapi cache (page:", pageNo, ")");
      const articles = cachedData.slice(start, end);
      if (articles.length === 0) {
        res.status(406).json({ error: "OutOfBound", status: "Error" });
        return;
      }
      const responseData = {
        totalPage: Math.ceil(cachedData.length / pageSize),
        pageNo: pageNo,
        articles: articles,
      };

      memoryCache.put(
        `headlines-${pageNo}-${pageSize}-${country}`,
        JSON.stringify(responseData),
        600000
      );
      res.json(responseData);
      return;
    }
    console.log("newsapi data not in cache...");

    console.log("retriving data from newsapi");
    const data = await newsapi.getTopHeadlines({
      country: country,
    });
    const headlines = data.articles.map((obj, index) => ({
      index: index,
      sourceName: obj.source.name,
      title: obj.title,
      description: obj.description,
      url: obj.url,
      urlToImage: obj.urlToImage,
      publishedAt: obj.publishedAt,
    }));
    const articles = headlines.slice(start, end);
    if (articles.length === 0) {
      res.status(406).json({ error: "OutOfBound", status: "Error" });
      return;
    }
    const responseData = {
      totalPage: Math.ceil(headlines.length / pageSize),
      pageNo: pageNo,
      articles: articles,
    };

    memoryCache.put(`headlines-${country}`, JSON.stringify(headlines), 600000); //cache the entire api data for 10 minutes to be used to server other pages.
    // cache page data for future requests.
    memoryCache.put(
      `headlines-${pageNo}-${pageSize}-${country}`,
      JSON.stringify(responseData),
      600000
    );
    res.json(responseData);
  } catch {
    console.log("failed to retrive data....");
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, function () {
  console.log(`NewsMan listening on http://localhost:${PORT}!`);
});
