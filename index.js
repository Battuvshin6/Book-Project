const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let books = JSON.parse(data);
      let arr = [];
      for (i = 0; i < 50; i++) {
        if (arr.length < 3) {
          function randomFunc(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }
          let bookId = randomFunc(0, books.books.length);
          if (!arr.includes(books.books[bookId])) {
            arr.push(books.books[bookId]);
          }
        }
      }
      res.send(arr);
    }
  });
});

app.get("/recent", (req, res) => {
  fs.writeFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let bookArr = JSON.parse(data);
      let sortedBookArr = bookArr.books.sort((a, b) => {
        let first = a.published;
        let last = b.published;
        if (first < last) {
          return 1;
        } else if (first > last) {
          return -1;
        } else {
          return 0;
        }
      });
      res.send(sortedBookArr);
    }
  });
});

app.get("/authors", (req, res) => {
  fs.writeFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let myData = JSON.parse(data);
      let authors = myData.books.map((e) => {
        e.author;
      });
      res.send(authors);
    }
  });
});

app.get("/description", (req, res) => {
  fs.writeFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let myData = JSON.parse(data);
      res.send(myData.books);
    }
  });
});

app.listen(3000);
