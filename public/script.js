let loadedNotes = document.querySelectorAll("div.noteWrap");
let loadedChange = document.querySelectorAll("div.change");
let loadedDel = document.querySelectorAll("div.delete");
let loadedIsReady = document.querySelectorAll("input.check-button");
if (location.href != `http://localhost:5000/`) {
  location.href = `http://localhost:5000/`;
}
const create = document.querySelector("div.create");
let i = 1 + loadedNotes.length;
create.onclick = () => {
  const container = document.querySelector("div.container");
  const newNote = document.createElement("div");
  container.appendChild(newNote);
  const buts1 = document.createElement("div");
  buts1.className = "buts1";
  newNote.appendChild(buts1);
  newNote.className = "noteWrap";
  newNote.style.background = "green";
  newNote.style.height = "20vh";
  newNote.style.width = "100vw";
  newNote.style.borderRadius = "20px";
  newNote.style.border = "2px solid #0A0A0A";
  newNote.id = `${i}`;
  const isReady = document.createElement("input");
  buts1.appendChild(isReady);
  isReady.className = "check-button";
  isReady.type = "checkbox";
  const change = document.createElement("div");
  buts1.appendChild(change);
  change.className = "change";
  const del = document.createElement("div");
  buts1.appendChild(del);
  del.className = "delete";
  change.onclick = () => {
    location.href = "http://localhost:5000/changes";
  };
  i++;
};
console.log(321);
