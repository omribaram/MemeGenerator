'use-strict'

var gKeywords = { 'happy': 12, 'sad': 1 };

var gImgs = createImgs()

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [createLine('Your Text Here...', 150, 70), createLine('Your Text Here...', 150, 300)]
}

function getImgsforGallery() {
    return gImgs;
}

function getImgforCanvas() {
    return gImgs[gMeme.selectedImgId]
}

function getLinesforCanvas() {
    return gMeme.lines;
}

function createLine(text, posX, posY) {
    return {
        text,
        size: 40,
        align: 'left',
        color: '#000000',
        font: 'Impact',
        lineWidth: 2,
        strokeStyle: '#ffffff',
        posX,
        posY
    }
}

function setImage(imgId) {
    gMeme.selectedImgId = imgId;
}

function setText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text;
}

function setTextSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changePos(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].posY + diff < 0 - diff ||
        gMeme.lines[gMeme.selectedLineIdx].posY + diff > gImgs[gMeme.selectedImgId].imgObj.height) return
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
}

function switchLine() {
    gMeme.selectedLineIdx = gMeme.selectedLineIdx === 0 ? 1 : 0;
    return gMeme.lines[gMeme.selectedLineIdx].text;
}

function createImgs() {
    var imgs = []
    for (var i = 0; i < 17; i++) {
        imgs.push(_createImg(i));
    }
    return imgs;
}

function _createImg(id) {
    var img = new Image();
    img.src = `/img/memes-v/${id+1}.jpg`;
    img.onload;
    return {
        id,
        imgObj: img,
        keywords: ['happy']
    }
}