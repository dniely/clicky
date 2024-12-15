"use strict";

var express = require('express');

var sqlite3 = require('sqlite3').verbose();

var app = express();
var port = 3000; // SQLite 데이터베이스 연결

var db = new sqlite3.Database(':memory:', function (err) {
  if (err) {
    console.error(err.message);
  } else {
    db.run('CREATE TABLE click_count (count INTEGER)', function (err) {
      if (err) {
        console.error(err.message);
      } else {
        db.run('INSERT INTO click_count (count) VALUES (0)');
      }
    });
  }
});
app.use(express["static"]('public'));
app.use(express.json());
app.post('/increment', function (req, res) {
  db.run('UPDATE click_count SET count = count + 1', function (err) {
    if (err) {
      return console.error(err.message);
    }

    db.get('SELECT count FROM click_count', function (err, row) {
      if (err) {
        return console.error(err.message);
      }

      res.json({
        count: row.count
      });
    });
  });
});
app.get('/count', function (req, res) {
  db.get('SELECT count FROM click_count', function (err, row) {
    if (err) {
      return console.error(err.message);
    }

    res.json({
      count: row.count
    });
  });
});
app.listen(port, function () {
  console.log("\uC11C\uBC84\uAC00 http://localhost:".concat(port, "\uC5D0\uC11C \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4."));
});
//# sourceMappingURL=server.dev.js.map
