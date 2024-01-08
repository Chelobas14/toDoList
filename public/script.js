let loadedNotes = document.querySelectorAll("div.noteWrap");
let loadedChange = document.querySelectorAll("div.change");
let loadedDel = document.querySelectorAll("div.delete");
let loadedIsReady = document.querySelectorAll("input.check-button");
location.href = `
  http://localhost:5000
  `;
for (let i = 1; i <= loadedNotes.length; i++) {
  loadedChange[i - 1].onmouseover = () => {
    loadedChange[i - 1].style.background = "url('pngwing.com(3).png')";
    loadedChange[i - 1].style.backgroundSize = "18px 18px";
  };
  loadedChange[i - 1].onmouseout = () => {
    loadedChange[i - 1].style.background = "url('pngwing.com(2).png')";
    loadedChange[i - 1].style.backgroundSize = "18px 18px";
  };
  loadedDel[i - 1].onmouseover = () => {
    loadedDel[i - 1].style.background = "url('delIconActive.png')";
    loadedDel[i - 1].style.backgroundSize = "18px 18px";
  };
  loadedDel[i - 1].onmouseout = () => {
    loadedDel[i - 1].style.background = "url('delIcon.png')";
    loadedDel[i - 1].style.backgroundSize = "18px 18px";
  };

  loadedNotes[i - 1].style.borderRadius = "20px";
  loadedNotes[i - 1].style.border = "2px solid #0A0A0A";
  loadedNotes[i - 1].style.height = "20vh";
  loadedNotes[i - 1].style.width = "100vw";

  loadedIsReady[i - 1].style.width = "20px";
  loadedIsReady[i - 1].style.height = "20px";
  loadedIsReady[i - 1].style.position = "absolute";
  loadedIsReady[i - 1].style.top = `${i * 20 - 3}vh`;
  loadedIsReady[i - 1].style.left = "91vw";

  loadedChange[i - 1].style.height = "18px";
  loadedChange[i - 1].style.width = "18px";
  loadedChange[i - 1].style.position = "absolute";
  loadedChange[i - 1].style.top = `${i * 20 - 2.7}vh`;
  loadedChange[i - 1].style.left = "83vw";
  loadedChange[i - 1].style.background = "url('pngwing.com(2).png')";
  loadedChange[i - 1].style.backgroundSize = "18px 18px";

  loadedDel[i - 1].style.height = "18px";
  loadedDel[i - 1].style.width = "18px";
  loadedDel[i - 1].style.position = "absolute";
  loadedDel[i - 1].style.top = `${i * 20 - 2.7}vh`;
  loadedDel[i - 1].style.left = "74vw";
  loadedDel[i - 1].style.background = "url('delIcon.png')";
  loadedDel[i - 1].style.backgroundSize = "18px 18px";
}

const create = document.querySelector("div.create");
// const wrapper = document.querySelector("div.wrapper");
// colBgInp = document.querySelector("input.changeBgColor");
// colBgInp.style.marginTop = "-100px";
// colBgInp.style.position = "absolute";
// // colBgInp.style.top = "100px";
// colInp = document.querySelector("input.changeColor");
// colInp.style.marginTop = "-120px";
// colInp.style.position = "absolute";
// // colInp.style.top = "140px";

let i = 1 + loadedNotes.length;
create.onclick = () => {
  const newNote = document.createElement("div");
  //  wrapper.appendChild(newNote);
  document.body.appendChild(newNote);
  newNote.className = "noteWrap";
  newNote.style.background = "green"; //colBgInp.value;
  newNote.style.height = "20vh";
  newNote.style.width = "100vw";
  newNote.style.borderRadius = "20px";
  newNote.style.border = "2px solid #0A0A0A";
  newNote.id = `${i}`;
  const isReady = document.createElement("input");
  newNote.appendChild(isReady);
  isReady.className = "check-button";
  isReady.style.width = "20px";
  isReady.style.height = "20px";
  isReady.style.position = "absolute";
  isReady.style.top = `${i * 20 - 3}vh`;
  isReady.style.left = "91vw";
  isReady.type = "checkbox";
  const change = document.createElement("div");
  newNote.appendChild(change);
  change.className = "change";
  change.style.height = "18px";
  change.style.width = "18px";
  change.style.position = "absolute";
  change.style.top = `${i * 20 - 2.7}vh`;
  change.style.left = "83vw";
  change.style.background = "url('pngwing.com(2).png')";
  change.style.backgroundSize = "18px 18px";
  change.onmouseover = () => {
    change.style.background = "url('pngwing.com(3).png')";
    change.style.backgroundSize = "18px 18px";
  };
  change.onmouseout = () => {
    change.style.background = "url('pngwing.com(2).png')";
    change.style.backgroundSize = "18px 18px";
  };
  change.onclick = () => {
    location.href = "http://localhost:5000/changes";
  };
  const del = document.createElement("div");
  newNote.appendChild(del);
  del.className = "delete";
  del.style.height = "18px";
  del.style.width = "18px";
  del.style.position = "absolute";
  del.style.top = `${i * 20 - 2.7}vh`;
  del.style.left = "74vw";
  del.style.background = "url('delIcon.png')";
  del.style.backgroundSize = "18px 18px";
  del.onmouseover = () => {
    del.style.background = "url('delIconActive.png')";
    del.style.backgroundSize = "18px 18px";
  };
  del.onmouseout = () => {
    del.style.background = "url('delIcon.png')";
    del.style.backgroundSize = "18px 18px";
  };
  i++;
};
console.log(321);
