// const express = require('express')
// const app = express()
// const port = 8080

// const onePageArticleCount = 10

// // Parse JSON bodies (as sent by API clients)
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;

const express = require("express");
const app = express();
const port = 8080;
const { newsArticleModel } = require("./connector");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (request, response) => {
  const _limit = request.query.limit;
  const _offset = request.query.offset;

  const limit = isNaN(_limit) ? 10 : Number(_limit);
  const offset = isNaN(_offset) ? 0 : Number(_offset);

  newsArticleModel
    .find()
    .limit(limit)
    .skip(offset)
    .then((data) => {
      response.send(data);
    })
    .catch((error) => response.send(error));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
