const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        db.run('CREATE TABLE click_count (count INTEGER)', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                db.run('INSERT INTO click_count (count) VALUES (0)');
            }
        });
    }
});

app.use(express.static('public'));
app.use(express.json());

app.post('/increment', (req, res) => {
    db.run('UPDATE click_count SET count = count + 1', function(err) {
        if (err) {
            return console.error(err.message);
        }
        db.get('SELECT count FROM click_count', (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.json({ count: row.count });
        });
    });
});

app.get('/count', (req, res) => {
    db.get('SELECT count FROM click_count', (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json({ count: row.count });
    });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
