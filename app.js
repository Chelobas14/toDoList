const express = require("express");
const url = require("url");
const app = express();
const port = 5000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS lists`);
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
});

app.set("view engine", "ejs");
app.use(express.static("public"));

let actId = 0;
let index = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Documen</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
        <!-- <input type="color" class="changeBgColor">
        <input type="color" class="changeColor"> -->`;
db.each(`SELECT Count(*) FROM lists`, (err, rows) => {
  for (let i = 1; i <= rows["Count(*)"]; i++) {
    db.each(`SELECT * FROM lists WHERE id==${i}`, (err, elem) => {
      index += `
      <div class="noteWrap" id="n${elem.id}" style="background: ${elem.bgcolor}; color: ${elem.color}">
        <input class="check-button" type="checkbox">
        <div class="change"></div>
        <div class="delete"></div>
      </div>`;
    });
    actId = i;
  }
});
setTimeout(() => {
  index += `
      <div class="context-menu">
          <div class="toolbar">
              <div class="rect-1"></div>
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
          </div>
          <div class="create">
              <div class="ellipse-1">
                  <div class="plus-rect-1"></div>
                  <div class="plus-rect-2"></div>
              </div>
          </div>
          <div class="account">
              <div class="icon"></div>
          </div>
      </div>
      <script src="script.js"></script>
    </body>
  </html>`;
}, 500);
app.get("/", (req, res) => {
  res.send(index);
  // db.each(`SELECT * FROM lists`, (err, row) => {
  //   res.send(`<h1>${row.id}, ${row.header}, ${row.isReady}</h1>`);
  // });
  let urlReq = url.parse(req.url, true);
  if (urlReq.query.text && urlReq.query.header) {
    let date = new Date();
    db.run(`INSERT INTO lists VALUES(
      ${actId + 1},
      '${urlReq.query.header}', 
      '${urlReq.query.text}', 
      '${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}', 
      '${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}', 
      0,
      '${urlReq.query.col}',
      '${urlReq.query.bg}'
    )`);
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
});
app.get("/changes", (req, res) => {
  res.render("changes/pageChange");
});
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
