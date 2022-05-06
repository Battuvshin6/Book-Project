const e = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
app
  .get("/", (req, res) => {
    fs.readFile("book.json", "utf-8", (error, data) => {
      let myData = JSON.parse(data);
      let allbooks = myData.books.map((e) => {
        return e.title;
      });
      let result = [];
      for (i = 0; i < 100; i++) {
        let randomBooks = allbooks[Math.floor(Math.random() * allbooks.length)];
        if (result[randomBooks]) {
          result[randomBooks]++;
        } else {
          result[randomBooks] = 1;
        }
      }
      if (error) {
        throw error;
      } else {
        res.send(console.log(result));
      }
    });
  })
  .listen(3000);
