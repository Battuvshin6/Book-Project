const e = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
app
  .get("/a-z", (req, res) => {
    fs.readFile("book.json", "utf-8", (error, data) => {
      let myData = JSON.parse(data);
      let allbooks = myData.books.map((e) => {
        return e.published;
      });
      if (error) {
        throw error;
      } else {
        res.send(console.log(allbooks));
      }
    });
  })
  .listen(3000);
