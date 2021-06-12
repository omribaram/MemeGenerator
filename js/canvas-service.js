'use-strict'

var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('[name="meme-canvas"]');
    gCtx = gElCanvas.getContext('2d');
    addEventListeners();
}

function drawCanvas() {
    gElCanvas.style.cursor = 'grab'
    drawImage();
    var lines = getLinesforCanvas();
    if (lines.length > 0) gLetters = lines[gMeme.selectedLineIdx].text;
    lines.forEach((line, idx) => drawText(line, idx));
    var stickers = getStickersforCanvas();
    stickers.forEach((sticker, idx) => drawStickerImage(sticker, idx));
}

function resizeCanvas() {
    if (window.innerWidth >= 601) gElCanvas.height = 550;
    if (window.innerWidth < 601) gElCanvas.width = window.innerWidth - 40;
    else gElCanvas.width = 440;
}

function drawImage(img) {
    if (!img) img = getImgforCanvas().imgObj;
    var ratio = img.width / img.height;
    var width = gElCanvas.width;
    var height = width / ratio;
    if (height < gElCanvas.height) {
        height = gElCanvas.height;
        width = height * ratio;
    }
    var xOffset = width > gElCanvas.width ? (gElCanvas.width - width) / 2 : 0;
    var yOffset = height > gElCanvas.height ? (gElCanvas.height - height) / 2 : 0;
    gCtx.drawImage(img, xOffset, yOffset, width, height);
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
    if (!isFinal) {
        gCtx.strokeRect(line.posX - 10, line.posY - line.size, line.width + 20, line.size * 1.286);
        gCtx.beginPath();
        gCtx.arc(line.posX - 10, line.posY - line.size, 5, 0, 2 * Math.PI);
        gCtx.arc(line.posX - 10, line.posY + 10, 5, 0, 2 * Math.PI);
        gCtx.fill();
        gCtx.beginPath();
        gCtx.arc(line.posX + line.width + 10, line.posY + 10, 5, 0, 2 * Math.PI);
        gCtx.arc(line.posX + line.width + 10, line.posY - line.size, 5, 0, 2 * Math.PI);
        gCtx.fill();
    }
    gCtx.setLineDash([])
}

// function addTxtShadow(line) {
//     gCtx.shadowColor = line.shadowColor;
//     gCtx.shadowOffsetX = line.shadowOffsetX;
//     gCtx.shadowOffsetY = line.shadowOffsetY;
//     gCtx.shadowBlur = line.shadowBlur;
// }

// function addTxtOutline(line) {
//     gCtx.strokeStyle = line.strokeStyle;
//     gCtx.lineWidth = line.lineWidth;
//     gCtx.strokeText(line.text, line.posX, line.posY);
// }

function drawStickerImage(sticker, idx, isFinal) {
    gCtx.drawImage(sticker.img, sticker.posX, sticker.posY, sticker.width, sticker.size);
    gCtx.setLineDash([1, 1])
    if (gMeme.selectedStickerIdx === idx) gCtx.strokeStyle = 'red';
    if (!isFinal) {
        gCtx.strokeRect(sticker.posX - 10, sticker.posY, sticker.width + 20, sticker.size);
        gCtx.beginPath();
        gCtx.arc(sticker.posX - 10, sticker.posY, 5, 0, 2 * Math.PI);
        gCtx.arc(sticker.posX - 10, sticker.posY + sticker.size, 5, 0, 2 * Math.PI);
        gCtx.fill();
        gCtx.beginPath();
        gCtx.arc(sticker.posX + sticker.width + 10, sticker.posY + sticker.size, 5, 0, 2 * Math.PI);
        gCtx.arc(sticker.posX + sticker.width + 10, sticker.posY, 5, 0, 2 * Math.PI);
        gCtx.fill();
    }
    gCtx.setLineDash([])
}

function getFinalCanvas() {
    drawImage();
    lines = getLinesforCanvas();
    lines.forEach(line => {
        drawText(line, '', true);
    })
    stickers = getStickersforCanvas();
    stickers.forEach(sticker => {
        drawStickerImage(sticker, '', true);
    })
    return gElCanvas.toDataURL();
}

function _clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}