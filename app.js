const express = require("express");
const url = require("url");
const app = express();
const port = 5000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.serialize(() => {
  //  db.run(`DROP TABLE IF EXISTS lists`);
  db.run(`
    CREATE TABLE IF NOT EXISTS lists(
      id INTEGER DEFAULT 0,
      header TEXT NOT NULL,
      text TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      isReady INTEGER NOT NULL DEFAULT 0,
      color TEXT NOT NULL DEFAULT white,
      bgcolor TEXT NOT NULL DEFAULT black
    )`);
  // db.run(`INSERT INTO lists VALUES(
  //     1,
  //     'header',
  //     'text',
  //     'time',
  //     'date',
  //     0,
  //     '#0cf',
  //     '#f40'
  //   )`);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
let index = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Documen</title>
    <link rel="stylesheet" href="style1.css" type="text/css">
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
  <div class="container">`;
db.each(`SELECT Count(*) FROM lists`, (err, rows) => {
  for (let i = 1; i <= rows["Count(*)"]; i++) {
    db.each(`SELECT * FROM lists WHERE id==${i}`, (err, elem) => {
      index += `
      <div class="noteWrap" id="n${elem.id}" style="background: ${elem.bgcolor}; color: ${elem.color};">
        <h1 class="noteHeader">${elem.header}</h1>
        <p class="noteText">${elem.text}</p>
        <div class="buts">
          <div class="delete"></div>
          <div class="change"></div>
          <input class="check-button" type="checkbox">
        </div>
      </div>`;
    });
  }
});
setTimeout(() => {
  index += `
    </div>
      <div class="context-menu">
        <div class="btn">
            <div class="wrap">
              <div class="toolbar"></div>
              <div class="create"></div>
              <div class="account"></div>
            </div>
        </div>
      </div>
      <script src="script.js"></script>
    </body>
  </html>`;
}, 500);
app.get("/", (req, res) => {
  // db.each(`SELECT * FROM lists`, (err, row) => {
  //   res.send(`<h1>${row.id}, ${row.header}, ${row.isReady}</h1>`);
  // });
  let urlReq = url.parse(req.url, true);
  if (urlReq.query.text && urlReq.query.header) {
    let date = new Date();
    db.each(`SELECT Count(*) FROM lists`, (err, rows) => {
      db.run(`INSERT INTO lists VALUES(
      ${rows["Count(*)"] + 1},
      '${urlReq.query.header}', 
      '${urlReq.query.text}', 
      '${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}', 
      '${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}', 
      0,
      '${urlReq.query.col}',
      '${urlReq.query.bg}'
    )`);
    });
    // for (let i = 0; i < db.run(`SELECT Count(*) FROM lists`); i++) {
    //   let elem = db.run(`SELECT * FROM lists WHERE rowid==${i}`);
    //   res.send(`
    //   <div class="noteWrap" style="background: ${elem.bgcolor}; color: ${elem.color};" id="n${elem.rowid}">
    //     <input class="check-button" style="width: 20px; height: 20px; position: absolute; top: 17vh; left: 91vw;" type="checkbox">
    //     <div class="change" style="height: 18px; width: 18px; position: absolute; top: 17.3vh; left: 83vw; background: url(&quot;pngwing.com(2).png&quot;) 0% 0% / 18px 18px;"></div>
    //     <div class="delete" style="height: 18px; width: 18px; position: absolute; top: 17.3vh; left: 74vw; background: url(&quot;delIcon.png&quot;) 0% 0% / 18px 18px;"></div>
    //     </div>
    //   `);
    // }
  }
  res.send(index);
});
app.get("/changes", (req, res) => {
  res.render("changes/pageChange");
});
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
