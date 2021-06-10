'use-strict'

var gCurrX, gCurrY, gStartX, gStartY, gIsDragging, gLetters = '';

function addEventListeners() {
    ['mousedown', 'touchstart'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseDown(event)));

    ['mousemove', 'touchmove'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseMove(event)));

    ['mouseup', 'touchend'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseUp(event)));

    ['keydown'].forEach(ev => window.addEventListener(ev, onKeyDown, true));

    ['mouseout'].forEach(ev => gElCanvas.addEventListener(ev, () => onMouseOut(event)));

    ['touchstart', 'touchend', 'touchmove'].forEach(ev => document.body.addEventListener(ev, (event) => {
        if (event.target == gElCanvas) {
            event.preventDefault();
        }
    }))
}

function isLineMatch(x, y, idx) {
    var line = gMeme.lines[idx];
    let width = line.posX + line.width;
    let height = line.posY - line.size;
    if (x >= line.posX && x <= width && y >= height && y <= line.posY) {
        gLetters = line.text;
        return true
    };
}

function onMouseDown(ev) {
    ev.preventDefault();
    gStartX = parseInt(ev.offsetX);
    gStartY = parseInt(ev.offsetY);
    for (var i = 0; i < gMeme.lines.length; i++) {
        if (isLineMatch(gStartX, gStartY, i)) {
            gMeme.selectedLineIdx = i;
            gIsDragging = true;
            gElCanvas.style.cursor = 'grabbing'
            drawCanvas();
        }
    }
}

function onMouseUp(ev) {
    ev.preventDefault();
    gIsDragging = false;;
    gElCanvas.style.cursor = 'grab'
}

function onMouseOut(ev) {
    ev.preventDefault();
    gIsDragging = false;
    gElCanvas.style.cursor = 'grab'
}

function onMouseMove(ev) {
    if (!gIsDragging) {
        return;
    }
    ev.preventDefault();
    gCurrX = parseInt(ev.offsetX);
    gCurrY = parseInt(ev.offsetY);

    var deltaX = gCurrX - gStartX;
    var deltaY = gCurrY - gStartY;
    gStartX = gCurrX;
    gStartY = gCurrY;

    var line = gMeme.lines[gMeme.selectedLineIdx];
    if (line.posX + deltaX < 20 ||
        line.posX + deltaX > gElCanvas.width - line.width - 20 ||
        line.posY + deltaY > gImgs[gMeme.selectedImgId].imgObj.height - 20 ||
        line.posY + deltaY < 45) return
    line.posX += deltaX;
    line.posY += deltaY;
    drawCanvas();
}

function onKeyDown(ev) {
    var blockedKeys = [20, 16, 17, 91, 18, 17, 16, 13, 33, 34, 19, 44, 45, 144, 13, 27, 112, 113, 115, 117, 119, 120, 123, 36, 35];
    if (blockedKeys.includes(ev.keyCode)) return
    if (ev.keyCode === 8 || ev.keyCode === 46) gLetters = gLetters.substring(0, gLetters.length - 1)
    else if (ev.keyCode === 9) {
        ev.preventDefault();
        onSwitchLine();
    } else gLetters += ev.key;
    onDrawText(gLetters)
}