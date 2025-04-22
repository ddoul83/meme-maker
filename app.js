const eraseBtn = document.getElementById("erase-btn");
const destroyBtn = document.getElementById("detroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("lineWidth");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const clickedColor = event.target.dataset.color;
  ctx.strokeStyle = clickedColor;
  ctx.fillStyle = clickedColor;
  color.value = clickedColor;
}

function onModeBtnClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function fillingCanvas() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyBtnClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseBtnClick() {
  isFilling = false;
  ctx.strokeStyle = "white";
  modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", fillingCanvas);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroyBtnClick);
eraseBtn.addEventListener("click", onEraseBtnClick);
