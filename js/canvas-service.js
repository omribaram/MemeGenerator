'use-strict'

var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('[name="meme-canvas"]');
    gCtx = gElCanvas.getContext('2d');
    addEventListeners();
    gElCanvas.style.cursor = 'grab'
    var img = getImgforCanvas().imgObj;
    gElCanvas.height = 750;
    gElCanvas.width = (img.height * gElCanvas.height) / img.width
    drawCanvas();
}

function drawCanvas() {
    drawImage();
    var lines = getLinesforCanvas();
    if (lines.length > 0) gLetters = lines[gMeme.selectedLineIdx].text;
    lines.forEach((line, idx) => drawText(line, idx));
}

function drawImage(img) {
    if (!img) img = getImgforCanvas();
    gCtx.drawImage(img.imgObj, 0, 0);
}

function drawText(line, idx, isFinal) {
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = `${line.size}px ${line.font}`;
    line.width = gCtx.measureText(line.text).width;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.text, line.posX, line.posY);
    gCtx.strokeText(line.text, line.posX, line.posY);
    gCtx.setLineDash([1, 1])
    if (gMeme.selectedLineIdx === idx) gCtx.strokeStyle = 'red';
    if (!isFinal) gCtx.strokeRect(line.posX - 10, line.posY - line.size, line.width + 20, line.size * 1.286);
    gCtx.setLineDash([])
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

function getFinalCanvas() {
    var img = getImgforCanvas().imgObj
    gElCanvas.height = img.height;
    drawImage();
    lines = getLinesforCanvas();
    lines.forEach(line => {
        drawText(line, '', true);
    })
    return gElCanvas.toDataURL();
}

function _clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}