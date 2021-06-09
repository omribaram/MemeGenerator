'use-strict'

const STORAGE_KEY = 'canvasDB';
var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('[name="meme-canvas"]');
    gCtx = gElCanvas.getContext('2d');
    // _addEventListeners();

    var img = getImgforCanvas().imgObj;
    // gElCanvas.width = (img.height * gElCanvas.height) / img.width
    gElCanvas.width = (img.height * gElCanvas.height) / img.width
        // gElCanvas.height = img.height
    drawCanvas();
}

function drawCanvas() {
    drawImage();
    var lines = getLinesforCanvas();
    lines.forEach(line => drawText(line));
}

function drawImage(isFirst = false) {
    var img = getImgforCanvas();
    gCtx.drawImage(img.imgObj, 0, 0);
}

function drawText(line) {
    gCtx.strokeStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.text, line.posX, line.posY);
    gCtx.strokeText(line.text, line.posX, line.posY);
}

function addTxtShadow(line) {
    gCtx.shadowColor = line.shadowColor;
    gCtx.shadowOffsetX = line.shadowOffsetX;
    gCtx.shadowOffsetY = line.shadowOffsetY;
    gCtx.shadowBlur = line.shadowBlur;
}

function addTxtOutline(line) {
    gCtx.strokeStyle = line.strokeStyle;
    gCtx.lineWidth = line.lineWidth;
    gCtx.strokeText(line.text, line.posX, line.posY);
}

function _clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function _addEventListeners() {
    ['mousedown',
        'touchstart',
        'mousemove',
        'touchmove',
        'mouseup',
        'touchend',
        'mouseout',
    ].forEach(ev => gElCanvas.addEventListener(ev, () => calcXy(ev, event)));

    ['touchstart',
        'touchend',
        'touchmove',
    ].forEach(ev => document.body.addEventListener(ev, (event) => {
        if (event.target == gElCanvas) {
            event.preventDefault();
        }
    }))
}