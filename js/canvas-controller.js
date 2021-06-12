'use-strict'

const gCorrXy = { prevX: null, currX: null, prevY: null, currY: null }
var gIsDragging, gObjDragged, gLetters = '';

function addEventListeners() {
    ['mousedown', 'touchstart'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseDown(event)));

    ['mousemove', 'touchmove'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseMove(event)));

    ['mouseup', 'touchend', 'mouseout'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseUpOut(event)));

    ['keydown'].forEach(ev => window.addEventListener(ev, onKeyDown, true));

    document.querySelector('.gallery').addEventListener('dragover', (ev) => ev.preventDefault(), true);
    document.querySelector('.gallery').addEventListener('drop', (ev) => {
        ev.preventDefault();
        draggedImage(ev.dataTransfer.files[0]);
    }, true);

    gElCanvas.addEventListener('dragover', (ev) => ev.preventDefault(), true);
    gElCanvas.addEventListener('drop', (ev) => {
        ev.preventDefault();
        draggedSticker(ev.dataTransfer.files[0]);
    }, true);

    // ['touchstart', 'touchend', 'touchmove'].forEach(ev => document.body.addEventListener(ev, (event) => {
    //     if (event.target == gElCanvas) {
    //         event.preventDefault();
    //     }
    // }))
}

function calcXy(ev) {
    if (ev.type === 'mousedown' || ev.type === 'touchstart' || ev.type === 'mouseenter') {
        gCorrXy.currX = ev.type === 'mousedown' || ev.type === 'mouseenter' ? ev.offsetX / (gElCanvas.offsetWidth / gElCanvas.width) : ev.touches[0].pageX - gElCanvas.offsetLeft;
        gCorrXy.currY = ev.type === 'mousedown' || ev.type === 'mouseenter' ? ev.offsetY / (gElCanvas.offsetHeight / gElCanvas.height) : ev.touches[0].pageY - gElCanvas.offsetTop;
    }

    if (ev.type === 'mousemove' || ev.type === 'touchmove') {
        gCorrXy.prevX = gCorrXy.currX;
        gCorrXy.prevY = gCorrXy.currY;
        gCorrXy.currX = ev.type === 'mousemove' ? ev.offsetX / (gElCanvas.offsetWidth / gElCanvas.width) : ev.touches[0].pageX - gElCanvas.offsetLeft;
        gCorrXy.currY = ev.type === 'mousemove' ? ev.offsetY / (gElCanvas.offsetHeight / gElCanvas.height) : ev.touches[0].pageY - gElCanvas.offsetTop;
    }
}

function isLineMatch(x, y, op, idx) {
    var obj;
    if (op === 'line') {
        obj = gMeme.lines[idx]
        var width = obj.posX + obj.width;
        var height = obj.posY - obj.size;
        if (x >= obj.posX && x <= width && y >= height && y <= obj.posY) {
            if (op === 'line') gLetters = obj.text;
            return true
        };
    } else if (op === 'sticker') {
        obj = gMeme.stickers[idx];
        var width = obj.posX + obj.width + 10;
        var height = obj.posY + obj.size + 10;
        if (x >= obj.posX && x <= width && y <= height && y >= obj.posY) return true
    }
}

function onMouseDown(ev) {
    ev.preventDefault();
    calcXy(ev)
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (isLineMatch(gCorrXy.currX, gCorrXy.currY, 'line', i)) {
            gMeme.selectedLineIdx = i;
            gIsDragging = true;
            gObjDragged = 'line';
            drawCanvas();
            break
        }
    }

    for (var i = 0; i < gMeme.stickers.length; i++) {
        if (isLineMatch(gCorrXy.currX, gCorrXy.currY, 'sticker', i)) {
            gMeme.selectedStickerIdx = i;
            gIsDragging = true;
            gObjDragged = 'sticker';
            drawCanvas();
            break
        }
    }
}

function onMouseUpOut(ev) {
    ev.preventDefault();
    gIsDragging = false;;
    gElCanvas.style.cursor = 'grab'
}

function onMouseMove(ev) {
    ev.preventDefault();
    if (!gIsDragging) {
        return;
    }
    calcXy(ev);
    var deltaX = gCorrXy.currX - gCorrXy.prevX;
    var deltaY = gCorrXy.currY - gCorrXy.prevY;
    var obj = gObjDragged === 'line' ? gMeme.lines[gMeme.selectedLineIdx] : gMeme.stickers[gMeme.selectedStickerIdx];
    // if (line.posX + deltaX < 20 ||
    //     line.posX + deltaX > gElCanvas.width - line.width - 20 ||
    //     line.posY + deltaY > gImgs[gMeme.selectedImgId].imgObj.height - 20 ||
    //     line.posY + deltaY < 45) return
    obj.posX += deltaX;
    obj.posY += deltaY;
    drawCanvas();
    gElCanvas.style.cursor = 'grabbing'
}

function onKeyDown(ev) {
    if (!document.querySelector('main').classList.contains('editor')) return
    var blockedKeys = [20, 16, 17, 91, 18, 17, 16, 13, 33, 34, 19, 44, 45, 144, 13, 27, 112, 113, 115, 117, 119, 120, 123, 36, 35, 37, 39, 40, 38, 183];
    if (blockedKeys.includes(ev.keyCode)) return
    if (ev.keyCode === 8 || ev.keyCode === 46) gLetters = gLetters.substring(0, gLetters.length - 1)
    else if (ev.keyCode === 9) {
        ev.preventDefault();
        onSwitchLine();
    } else gLetters += ev.key;
    onDrawText(gLetters)
}