const express = require("express");
const fs = require("fs");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.use("ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
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
      res.render("main.ejs", { books: arr, port: 3000 });
    }
  });
});

router.get("/recent", (req, res) => {
  fs.readFile("book.json", (error, data) => {
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

router.get("/authors", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let myData = JSON.parse(data);
      console.log(myData);
      let authors = myData.books.map((e) => {
        return e.author;
      });
      res.send(authors);
    }
  });
});

router.get("/description", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let myData = JSON.parse(data);
      res.send(myData.books);
    }
  });
});

app.get("/book/:isbn_id", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let bookID = req.params.isbn_id;
      let myData = JSON.parse(data);
      let searchedBook;
      for (i = 0; i < myData.books.length; i++) {
        if (myData.books[i].isbn == bookID) {
          searchedBook = myData.books[i];
        } else {
        }
      }
      if (searchedBook) {
        res.send(searchedBook);
      } else {
        res.send("no book");
      }
    }
  });
});

app.get("/mostpages", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      const myData = JSON.parse(data);
      let sortedData = myData.books.sort((x, y) => {
        if (x.pages > y.pages) {
          return -1;
        } else if (x.pages < y.pages) {
          return 1;
        } else {
          return 0;
        }
      });
      res.send(sortedData[0]);
    }
  });
});

app.get("/leastpages", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      const myData = JSON.parse(data);
      let sortedData = myData.books.sort((x, y) => {
        if (x.pages > y.pages) {
          return 1;
        } else if (x.pages < y.pages) {
          return -1;
        } else {
          return 0;
        }
      });
      res.send(sortedData[0]);
    }
  });
});

app.get("/addbooks", (req, res) => {
  res.render("index.ejs");
});
app.listen(3000);
