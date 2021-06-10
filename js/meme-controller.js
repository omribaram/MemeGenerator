'use-strict'

function onInit() {
    renderGallery();
    renderKeywords();
}

function renderGallery(size = 8) {
    var imgs = getImgsforGallery();
    var strHTMLs = imgs.map(img => {
        return `<div class="card-image${img.id} ${img.imgObj.width / img.imgObj.height > 1.35 ? 'landscape' : 'square'}" onclick="onCreateMeme(${img.id})">
                            ${img.imgObj.outerHTML}
                        </div>`
    }).join('');
    document.querySelector('.gallery').innerHTML = strHTMLs;
}

function renderKeywords(size = 8) {
    idx = 9;
    document.querySelector('.keywords').innerHTML = getKeyworsdforGallery(size).map(keyword => {
        idx--;
        return `<span class="keyword${idx}" onclick="onSetKeyword('${keyword[0]}')">${keyword[0]}</span>`
    }).sort(() => Math.random() - 0.5).join('') + `${size===8 ? '<span class="keywords-toggle" onclick="renderKeywords(24)">More...</span>' :
    '<span class="keywords-toggle" onclick="renderKeywords(8)">Less...</span>'}`;
}

function renderMemes() {
    var memes = getMemesforDisplay();
    if (!memes) return document.querySelector('.memes').innerHTML = 'No saved memes.'
    var strHTMLs = memes.map((meme, idx) => {
        var img = new Image()
        img.src = meme.data;
        return `<div class="card-image ${gImgs[meme.selectedImgId].imgObj.width / gImgs[meme.selectedImgId].imgObj.height > 1.35 ? 'landscape' : 'square'}" onclick="onLoadMeme(${idx})">
                    ${img.outerHTML}
                </div>`;
    }).join('');
    document.querySelector('.memes').innerHTML = strHTMLs;
}

function renderStickers() {
    var stickers = getStickersforDisplay();
    var strHTMLs = stickers.map((sticker, idx) => {
        return `<span class="sticker${idx}" onclick="onAddSticker(${idx})">${sticker}</span>`;
    }).join('');
    document.querySelector('.stickers').innerHTML = strHTMLs;
}

function onMovePage(diff) {
    movePage(diff);
    renderStickers();
}

function onAddSticker(idx) {
    addSticker(idx);
    drawCanvas();
}

function onCreateMeme(imgId) {
    createMeme('', imgId);
    initCanvas();
    onToggleEditor();
}

function onSaveMeme() {
    saveMeme();
}

function onDownloadMeme(elLink) {
    var img = downloadMeme();
    elLink.children[0].href = img;
    elLink.children[0].download = 'img.png';
}

function onLoadMeme(idx) {
    loadMeme(idx);
    initCanvas();
    onToggleEditor();
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
    drawCanvas()
}

function onSetTextSize(size) {
    setTextSize(size);
    document.querySelector('.text-size').innerText = size;
    drawCanvas();
}

function onSetAlign(dir) {
    setAlign(dir);
    drawCanvas();
}

function onSetOutlineColor(color) {
    setOutlineColor(color);
    drawCanvas();
}

function onSetTextColor(color) {
    setTextColor(color);
    drawCanvas();
}

function onSetSearch(value) {
    setSearch(value);
    elKeywordSearch = document.querySelector('.search-keyword').value = value;
    renderGallery();
}

function onSetKeyword(value) {
    setKeyword(value)
    renderKeywords();
    onSetSearch(value);
}

function onAddLine() {
    addLine();
    drawCanvas();
}

function onDeleteLine() {
    deleteLine();
    drawCanvas();
}

function onImgUpload(ev) {
    imgUpload(ev, createImg)
}

function onToggleGallery() {
    document.querySelector('.layout').classList.remove('editor');
    document.querySelector('.layout').classList.remove('memes');
    document.querySelector('footer').classList.remove('editor');
    document.querySelector('footer').classList.remove('memes');
    document.querySelector('main').classList.remove('editor');
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.memes').classList.add('hidden');
    document.querySelector('.gallery-button').classList.add('hidden');
    document.querySelector('.memes-button').classList.remove('hidden');
    document.querySelector('.canvas-editor').classList.add('hidden');
    document.querySelector('.keywords-container').classList.remove('hidden');
}

function onToggleEditor() {
    document.querySelector('.gallery-button').classList.remove('hidden');
    document.querySelector('.memes-button').classList.remove('hidden');
    document.querySelector('.canvas-editor').classList.remove('hidden');
    document.querySelector('.layout').classList.remove('memes');
    document.querySelector('footer').classList.remove('memes');
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.memes').classList.add('hidden');
    document.querySelector('.keywords-container').classList.add('hidden');
    document.querySelector('.layout').classList.add('editor');
    document.querySelector('main').classList.add('editor');
    document.querySelector('footer').classList.add('editor');
    renderStickers()
}

function onToggleMemes() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.memes').classList.remove('hidden');
    document.querySelector('.gallery-button').classList.remove('hidden');
    document.querySelector('.memes-button').classList.add('hidden');
    document.querySelector('.canvas-editor').classList.add('hidden');
    document.querySelector('.keywords-container').classList.add('hidden');
    document.querySelector('.layout').classList.add('editor');
    document.querySelector('main').classList.add('editor');
    document.querySelector('footer').classList.add('editor');
    renderMemes();
}