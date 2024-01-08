const note = document.createElement("div");
document.body.append(note);
note.className = "noteWrap";
note.style.height = "20vh";
note.style.width = "100vw";
note.style.border = "2px #0A0A0A solid";
note.style.background = "green";
note.style.color = "white";
note.style.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif";
note.style.margin = "0px";
note.style.fontSize = "40px";
note.style.borderRadius = "20px";

const headerInp = document.createElement("input");
note.appendChild(headerInp);
headerInp.type = "text";
headerInp.style.height = "3vh";
headerInp.style.width = "40vh";
headerInp.style.marginLeft = `${(100 - 20) / 2}vw`;
headerInp.style.position = "absolute";
headerInp.style.top = `5px`;
headerInp.style.border = "2px solid black";
headerInp.style.borderRadius = "50px";
headerInp.style.outline = "none";
headerInp.style.background = "#00000000";

const textField = document.createElement("input");
note.appendChild(textField);
textField.className = "changeInp";
textField.type = "text";
textField.style.width = "98vw";
textField.style.height = "13vh";
textField.style.background = "#00000000";
textField.style.outline = "none";
textField.style.marginTop = "5vh";
textField.style.marginLeft = "1vw";
textField.style.border = "none";
textField.style.display = "flex";
textField.style.textAlign = "top";
textField.style.justifyContent = "top";

const colors = document.createElement("div");
colors.className = "colContainers";
document.body.append(colors);
colors.style.width = "25vw";
colors.style.display = "flex";
colors.style.marginLeft = `${(100 - 25) / 2}vw`;

const bgColContainer = document.createElement("div");
colors.appendChild(bgColContainer);
bgColContainer.style.padding = "5px";
bgColContainer.style.border = "1px solid #0A0A0A";
bgColContainer.className = "bgColContainer";
bgColContainer.style.width = "12vw";
bgColContainer.style.borderRadius = "10px";
bgColContainer.innerHTML = "Цвет фона заметки:";
bgColContainer.style.fontFamily =
  "-apple-system, BlinkMacSystemFont, sans-serif";
const redInp = document.createElement("input");
bgColContainer.appendChild(redInp);
redInp.type = "range";
redInp.style.width = "10vw";
redInp.min = "0";
redInp.max = "255";
redInp.style.marginLeft = "1vw";
const greenInp = document.createElement("input");
bgColContainer.appendChild(greenInp);
greenInp.type = "range";
greenInp.style.width = "10vw";
greenInp.min = "0";
greenInp.max = "255";
greenInp.style.marginLeft = "1vw";
const blueInp = document.createElement("input");
bgColContainer.appendChild(blueInp);
blueInp.type = "range";
blueInp.style.width = "10vw";
blueInp.min = "0";
blueInp.max = "255";
blueInp.style.marginLeft = "1vw";

let bgCol = setInterval(() => {
  bgColContainer.style.background = `rgb(${redInp.value}, ${greenInp.value}, ${blueInp.value})`;
  bgColContainer.style.color = `rgb(${255 - redInp.value}, ${
    255 - greenInp.value
  }, ${255 - blueInp.value})`;
}, 10);

const colContainer = document.createElement("div");
colors.appendChild(colContainer);
colContainer.style.borderRadius = "10px";
colContainer.style.padding = "5px";
colContainer.style.border = "1px solid #0A0A0A";
colContainer.className = "colContainer";
colContainer.style.width = "12vw";
colContainer.innerHTML = "Цвет текста заметки:";
colContainer.style.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif";
const redInpC = document.createElement("input");
colContainer.appendChild(redInpC);
redInpC.type = "range";
redInpC.style.width = "10vw";
redInpC.min = "0";
redInpC.max = "255";
redInpC.style.marginLeft = "1vw";
redInpC.value = "255";

const greenInpC = document.createElement("input");
colContainer.appendChild(greenInpC);
greenInpC.type = "range";
greenInpC.style.width = "10vw";
greenInpC.min = "0";
greenInpC.max = "255";
greenInpC.style.marginLeft = "1vw";
greenInpC.value = "255";

const blueInpC = document.createElement("input");
colContainer.appendChild(blueInpC);
blueInpC.type = "range";
blueInpC.style.width = "10vw";
blueInpC.min = "0";
blueInpC.max = "255";
blueInpC.style.marginLeft = "1vw";
blueInpC.value = "255";

let Col = setInterval(() => {
  colContainer.style.background = `rgb(${redInpC.value}, ${greenInpC.value}, ${blueInpC.value})`;
  colContainer.style.color = `rgb(${255 - redInpC.value}, ${
    255 - greenInpC.value
  }, ${255 - blueInpC.value})`;
  headerInp.style.color = `rgb(${redInpC.value}, ${greenInpC.value}, ${blueInpC.value})`;
  textField.style.background =
    note.style.background = `rgb(${redInp.value}, ${greenInp.value}, ${blueInp.value})`;
  textField.style.color = `rgb(${redInpC.value}, ${greenInpC.value}, ${blueInpC.value})`;
}, 10);

const saveChanges = document.createElement("div");
document.body.appendChild(saveChanges);
saveChanges.className = "saveChanges";
saveChanges.style.width = "min(660px, 90vw)";
saveChanges.style.left = `${
  (100 - Math.min((660 * 100) / window.innerWidth, 90) / 2) / 2 - 9
}vw`;
saveChanges.style.top = `${90}vh`;
saveChanges.style.fontSize = "50px";
saveChanges.style.fontFamily = "-apple-system, BlinkMacSystemFont, sans-serif";
saveChanges.style.color = "white";
saveChanges.innerHTML = "Сохранить изменения";
saveChanges.style.paddingTop = "2vh";
saveChanges.style.paddingLeft = "3vw";

saveChanges.onmouseover = () => {
  saveChanges.style.color = "yellow";
};

saveChanges.onmouseout = () => {
  saveChanges.style.color = "white";
};

saveChanges.onclick = () => {
  location.href = `
  http://localhost:5000?text=${textField.value}
    &bg=${bgColContainer.style.background}
    &col=${colContainer.style.color}&header=${headerInp.value || "asd"}
  `;
};
