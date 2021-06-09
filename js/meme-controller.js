'use-strict'

function onInit() {
    renderGallery();
}

function renderGallery() {
    var imgs = getImgsforGallery();
    var strHTMLs = imgs.map(img => {
        return `<div class="card-image${img.id} ${img.imgObj.width / img.imgObj.height > 1.35 ? 'landscape' : 'square'}" onclick="onSetImage(${img.id})">
                            ${img.imgObj.outerHTML}
                        </div>`
    }).join('');
    document.querySelector('.gallery').innerHTML = strHTMLs;
}

function onSetImage(imgId) {
    setImage(imgId);
    initCanvas();
    onToggleGallery();
}

function onDrawText(text) {
    setText(text);
    drawCanvas();
}

function onChangePos(diff) {
    changePos(diff);
    drawCanvas();
}

function onSwitchLine() {
    var elInputText = document.querySelector('.text-input');
    elInputText.value = switchLine();
}

function onSetTextSize(diff) {
    setTextSize(diff);
    drawCanvas();
}

function onToggleGallery() {
    document.querySelector('.gallery').classList.toggle('hidden');
    document.querySelector('.canvas-editor').classList.toggle('hidden');
    document.querySelector('.keywords').classList.toggle('hidden');
    document.querySelector('.layout').classList.toggle('editor');
    document.querySelector('footer').classList.toggle('editor');
}