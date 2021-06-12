'use-strict'

function onInit() {
    createImgs();
    getKeywords();
    renderGallery();
    renderKeywords();
    initCanvas();
    document.querySelector('.file-input-button').addEventListener('click', () => document.querySelector('.file-input').click())
    document.querySelector('[name="text-color"]').addEventListener('click', () => document.querySelector('.text-color').click())
    document.querySelector('[name="text-stroke"]').addEventListener('click', () => document.querySelector('.text-stroke').click())
}

function renderGallery(size = 8) {
    var imgs = getImgsforGallery();
    var strHTMLs = imgs.map(img => {
        return `<div class="card-image" onclick="onCreateMeme(${img.id})">
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
    var idx = gPageIdx * PAGE_SIZE - 1
    var strHTMLs = stickers.map((sticker) => {
        idx++
        return `<span class="sticker${idx}" onclick="onAddStickerEmoji(${idx})">${sticker}</span>`;
    }).join('');
    document.querySelector('.stickers').innerHTML = strHTMLs;
}

function onMovePage(diff) {
    movePage(diff);
    renderStickers();
}

function onAddStickerEmoji(idx) {
    addStickerEmoji(idx);
    drawCanvas();
}

function onAddStickerImage(img) {
    addStickerImage(img);
    drawCanvas();
}

function onCreateMeme(imgId) {
    onResizeCanvas();
    createMeme('', imgId);
    drawCanvas();
    onToggleEditor();
}

function onResizeCanvas() {
    resizeCanvas();
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
    drawCanvas();
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

function onSwitchLine(line) {
    var elInputText = document.querySelector('.text-input');
    elInputText.value = switchLine(line);
    document.querySelector('[name="text-input-size"]').value = gMeme.lines[gMeme.selectedLineIdx].size;
    document.querySelector('.text-size').innerText = gMeme.lines[gMeme.selectedLineIdx].size;
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
    document.querySelector('[name="text-input-size"]').value = gMeme.lines[gMeme.selectedLineIdx].size;
    document.querySelector('.text-size').innerText = gMeme.lines[gMeme.selectedLineIdx].size;
    drawCanvas();
}

function onDeleteLine() {
    deleteLine();
    drawCanvas();
}

function onSetTextFont(font) {
    setTextFont(font);
    drawCanvas();
}

function onImgDrag(img) {
    createImg(gImgs.length - 1, img, [''])
    onCreateMeme(gImgs.length - 1)
}

function onToggleHamMenu() {
    document.querySelector('.hamburger').classList.toggle("active");
    document.querySelector('.nav-menu').classList.toggle("active");
}

function onToggleGallery() {
    document.querySelector('.layout').classList.remove('editor');
    document.querySelector('.layout').classList.remove('memes');
    document.querySelector('footer').classList.remove('editor');
    document.querySelector('footer').classList.remove('memes');
    document.querySelector('main').classList.remove('editor');
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.memes').classList.add('hidden');
    document.querySelector('.canvas').classList.add('hidden');
    document.querySelector('.keywords-container').classList.remove('hidden');
    document.querySelector('.upload-image').classList.remove('hidden');
    if (document.querySelector('.hamburger').classList.contains('active')) onToggleHamMenu()
}

function onToggleEditor() {
    document.querySelector('.canvas').classList.remove('hidden');
    document.querySelector('.layout').classList.remove('memes');
    document.querySelector('footer').classList.remove('memes');
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.memes').classList.add('hidden');
    document.querySelector('.upload-image').classList.add('hidden');
    document.querySelector('.keywords-container').classList.add('hidden');
    document.querySelector('.layout').classList.add('editor');
    document.querySelector('main').classList.add('editor');
    document.querySelector('footer').classList.add('editor');
    document.querySelector('.text-size').innerText = gMeme.lines[gMeme.selectedLineIdx].size;
    renderStickers()
}

function onToggleMemes() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.memes').classList.remove('hidden');
    document.querySelector('.canvas').classList.add('hidden');
    document.querySelector('.keywords-container').classList.add('hidden');
    document.querySelector('.upload-image').classList.add('hidden');
    document.querySelector('.layout').classList.add('editor');
    document.querySelector('.layout').classList.add('meme');
    document.querySelector('main').classList.add('editor');
    document.querySelector('footer').classList.add('editor');
    if (document.querySelector('.hamburger').classList.contains('active')) onToggleHamMenu()
    renderMemes();
}