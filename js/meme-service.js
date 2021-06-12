'use-strict'

const STORAGE_KEY = 'memesDB';
const PAGE_SIZE = 5;
var gImgs = []
var gKeywords;
var gMeme;
var gFilterBy;
var gStickersEmoji = ['⌚', '⌛', '⏩', '⏪', '⏫', '⏬', '⏭', '⏮', '⏯', '⏰', '⏱', '⏲', '⏳', '⏸', '⏹', '⏺', 'Ⓜ', '☔', '☕', '☝', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '♟', '♿', '⚓', '⚡', '⚪', '⚫', '⚽', '⚾', '⛄', '⛅', '⛎', '⛏', '⛑', '⛓', '⛔', '⛩', '⛪', '⛰', '⛱', '⛲', '⛳', '⛴', '⛵', '⛷', '⛸', '⛹', '⛺', '⛽', '✂', '✅', '✈', '✉', '✊', '✋', '✌', '✍', '✏', '✒', '✔', '✖', '✝', '✡', '✨', '✳', '✴', '❄', '❇', '❌', '❎', '❓', '❔', '❕', '❗', '❣', '❤', '➕', '➖', '➗', '➡', '➰', '➿', '⤴', '⤵', '⬅', '⬆', '⬇', '⬛', '⬜', '⭐', '⭕', '〰', '〽', '㊗', '㊙', '🀄', '🃏', '🅰', '🅱', '🅾', '🅿', '🆎', '🆑', '🆒', '🆓', '🆔', '🆕', '🆖', '🆗', '🆘', '🆙', '🆚', '🈁', '🈂', '🈚', '🈯', '🈲', '🈳', '🈴', '🈵', '🈶', '🈷', '🈸', '🈹', '🈺', '🉐', '🉑', '🌀', '🌁', '🌂', '🌃', '🌄', '🌅', '🌆', '🌇', '🌈', '🌉', '🌊', '🌋', '🌌', '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '🌝', '🌞', '🌟', '🌠', '🌡', '🌤', '🌥', '🌦', '🌧', '🌨', '🌩', '🌪', '🌫', '🌬', '🌭', '🌮', '🌯', '🌰', '🌱', '🌲', '🌳', '🌴', '🌵', '🌶', '🌷', '🌸', '🌹', '🌺', '🌻', '🌼', '🌽', '🌾', '🌿', '🍀', '🍁', '🍂', '🍃', '🍄', '🍅', '🍆', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🍔', '🍕', '🍖', '🍗', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍞', '🍟', '🍠', '🍡', '🍢', '🍣', '🍤', '🍥', '🍦', '🍧', '🍨', '🍩', '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🍰', '🍱', '🍲', '🍳', '🍴', '🍵', '🍶', '🍷', '🍸', '🍹', '🍺', '🍻', '🍼', '🍽', '🍾', '🍿', '🎀', '🎁', '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎', '🎏', '🎐', '🎑', '🎒', '🎓', '🎖', '🎗', '🎙', '🎚', '🎛', '🎞', '🎟', '🎠', '🎡', '🎢', '🎣', '🎤', '🎥', '🎦', '🎧', '🎨', '🎩', '🎪', '🎫', '🎬', '🎭', '🎮', '🎯', '🎰', '🎱', '🎲', '🎳', '🎴', '🎵', '🎶', '🎷', '🎸', '🎹', '🎺', '🎻', '🎼', '🎽', '🎾', '🎿', '🏀', '🏁', '🏂', '🏃', '🏄', '🏅', '🏆', '🏇', '🏈', '🏉', '🏊', '🏋', '🏌', '🏍', '🏎', '🏏', '🏐', '🏑', '🏒', '🏓', '🏔', '🏕', '🏖', '🏗', '🏘', '🏙', '🏚', '🏛', '🏜', '🏝', '🏞', '🏟', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🏰', '🏳', '🏴', '🏵', '🏷', '🏸', '🏹', '🏺', '🏻', '🏼', '🏽', '🏾', '🏿', '🐀', '🐁', '🐂', '🐃', '🐄', '🐅', '🐆', '🐇', '🐈', '🐉', '🐊', '🐋', '🐌', '🐍', '🐎', '🐏', '🐐', '🐑', '🐒', '🐓', '🐔', '🐕', '🐖', '🐗', '🐘', '🐙', '🐚', '🐛', '🐜', '🐝', '🐞', '🐟', '🐠', '🐡', '🐢', '🐣', '🐤', '🐥', '🐦', '🐧', '🐨', '🐩', '🐪', '🐫', '🐬', '🐭', '🐮', '🐯', '🐰', '🐱', '🐲', '🐳', '🐴', '🐵', '🐶', '🐷', '🐸', '🐹', '🐺', '🐻', '🐼', '🐽', '🐾', '🐿', '👀', '👁', '👂', '👃', '👄', '👅', '👆', '👇', '👈', '👉', '👊', '👋', '👌', '👍', '👎', '👏', '👐', '👑', '👒', '👓', '👔', '👕', '👖', '👗', '👘', '👙', '👚', '👛', '👜', '👝', '👞', '👟', '👠', '👡', '👢', '👣', '👤', '👥', '👦', '👧', '👨', '👩', '👪', '👫', '👬', '👭', '👮', '👯', '👰', '👱', '👲', '👳', '👴', '👵', '👶', '👷', '👸', '👹', '👺', '👻', '👼', '👽', '👾', '👿', '💀', '💁', '💂', '💃', '💄', '💅', '💆', '💇', '💈', '💉', '💊', '💋', '💌', '💍', '💎', '💏', '💐', '💑', '💒', '💓', '💔', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '💞', '💟', '💠', '💡', '💢', '💣', '💤', '💥', '💦', '💧', '💨', '💩', '💪', '💫', '💬', '💭', '💮', '💯', '💰', '💱', '💲', '💳', '💴', '💵', '💶', '💷', '💸', '💹', '💺', '💻', '💼', '💽', '💾', '💿', '📀', '📁', '📂', '📃', '📄', '📅', '📆', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '📏', '📐', '📑', '📒', '📓', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📛', '📜', '📝', '📞', '📟', '📠', '📡', '📢', '📣', '📤', '📥', '📦', '📧', '📨', '📩', '📪', '📫', '📬', '📭', '📮', '📯', '📰', '📱', '📲', '📳', '📴', '📵', '📶', '📷', '📸', '📹', '📺', '📻', '📼', '📽', '📿', '🔀', '🔁', '🔂', '🔃', '🔄', '🔅', '🔆', '🔇', '🔈', '🔉', '🔊', '🔋', '🔌', '🔍', '🔎', '🔏', '🔐', '🔑', '🔒', '🔓', '🔔', '🔕', '🔖', '🔗', '🔘', '🔙', '🔚', '🔛', '🔜', '🔝', '🔞', '🔟', '🔠', '🔡', '🔢', '🔣', '🔤', '🔥', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '🔬', '🔭', '🔮', '🔯', '🔰', '🔱', '🔲', '🔳', '🔴', '🔵', '🔶', '🔷', '🔸', '🔹', '🔺', '🔻', '🔼', '🔽', '🕉', '🕊', '🕋', '🕌', '🕍', '🕎', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧', '🕯', '🕰', '🕳', '🕴', '🕵', '🕶', '🕷', '🕸', '🕹', '🕺', '🖇', '🖊', '🖋', '🖌', '🖍', '🖐', '🖕', '🖖', '🖤', '🖥', '🖨', '🖱', '🖲', '🖼', '🗂', '🗃', '🗄', '🗑', '🗒', '🗓', '🗜', '🗝', '🗞', '🗡', '🗣', '🗨', '🗯', '🗳', '🗺', '🗻', '🗼', '🗽', '🗾', '🗿', '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑', '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣', '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬', '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀', '🙁', '🙂', '🙃', '🙄', '🙅', '🙆', '🙇', '🙈', '🙉', '🙊', '🙋', '🙌', '🙍', '🙎', '🙏', '🚀', '🚁', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚋', '🚌', '🚍', '🚎', '🚏', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🚚', '🚛', '🚜', '🚝', '🚞', '🚟', '🚠', '🚡', '🚢', '🚣', '🚤', '🚥', '🚦', '🚧', '🚨', '🚩', '🚪', '🚫', '🚬', '🚭', '🚮', '🚯', '🚰', '🚱', '🚲', '🚳', '🚴', '🚵', '🚶', '🚷', '🚸', '🚹', '🚺', '🚻', '🚼', '🚽', '🚾', '🚿', '🛀', '🛁', '🛂', '🛃', '🛄', '🛅', '🛋', '🛌', '🛍', '🛎', '🛏', '🛐', '🛑', '🛒', '🛠', '🛡', '🛢', '🛣', '🛤', '🛥', '🛩', '🛫', '🛬', '🛰', '🛳', '🛴', '🛵', '🛶', '🛷', '🛸', '🛹', '🛺', '🤐', '🤑', '🤒', '🤓', '🤔', '🤕', '🤖', '🤗', '🤘', '🤙', '🤚', '🤛', '🤜', '🤝', '🤞', '🤟', '🤠', '🤡', '🤢', '🤣', '🤤', '🤥', '🤦', '🤧', '🤨', '🤩', '🤪', '🤫', '🤬', '🤭', '🤮', '🤯', '🤰', '🤱', '🤲', '🤳', '🤴', '🤵', '🤶', '🤷', '🤸', '🤹', '🤺', '🤼', '🤽', '🤾', '🥀', '🥁', '🥂', '🥃', '🥄', '🥅', '🥇', '🥈', '🥉', '🥊', '🥋', '🥌', '🥍', '🥎', '🥏', '🥐', '🥑', '🥒', '🥓', '🥔', '🥕', '🥖', '🥗', '🥘', '🥙', '🥚', '🥛', '🥜', '🥝', '🥞', '🥟', '🥠', '🥡', '🥢', '🥣', '🥤', '🥥', '🥦', '🥧', '🥨', '🥩', '🥪', '🥫', '🦀', '🦁', '🦂', '🦃', '🦄', '🦅', '🦆', '🦇', '🦈', '🦉', '🦊', '🦋', '🦌', '🦍', '🦎', '🦏', '🦐', '🦑', '🦒', '🦓', '🦔', '🦕', '🦖', '🦗', '🧀', '🧐', '🧑', '🧒', '🧓', '🧔', '🧕', '🧖', '🧗', '🧘', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '🧠', '🧡', '🧢', '🧣', '🧤', '🧥', '🧦']
var gPageIdx = 0;

function createMeme(meme, imgId) {
    if (meme) {
        gMeme = meme;
        if (gMeme.stickers) gMeme.stickers.forEach((sticker, idx) => {
            var img = new Image()
            img.src = gMeme.stickers[idx].img
            gMeme.stickers[idx].img = img
        })
    } else gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        selectedStickerIdx: 0,
        lines: [createLine('Your Text Here...', gElCanvas.width / 5, 50), createLine('Your Text Here...', gElCanvas.width / 5, gElCanvas.height - 20)],
        stickers: []
    }
}

function movePage(diff) {
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE >= gStickersEmoji.length) gPageIdx = 0;
    else if (gPageIdx < 0) gPageIdx = (gStickersEmoji.length / PAGE_SIZE) - 1
}

function getImgsforGallery() {
    if (!gFilterBy) return gImgs;
    var regex = new RegExp(gFilterBy);
    return gImgs.filter(img => regex.test(img.keywords))
}

function getKeyworsdforGallery(size) {
    var sortedKeywords = []
    for (var keyword in gKeywords) {
        sortedKeywords.push([keyword, gKeywords[keyword]]);
    }

    sortedKeywords.sort((a, b) => {
        return a[1] - b[1];
    }).reverse();

    return sortedKeywords.slice(0, size)
}

function getMemesforDisplay() {
    return loadMemesFromStorage(STORAGE_KEY);
}

function getStickersforDisplay() {
    var startIdx = gPageIdx * PAGE_SIZE
    return gStickersEmoji.slice(startIdx, startIdx + PAGE_SIZE);
}

function getImgforCanvas() {
    if (gMeme) return gImgs[gMeme.selectedImgId]
    else return false
}

function getStickersforCanvas() {
    if (gMeme) return gMeme.stickers;
    else return false
}

function getLinesforCanvas() {
    return gMeme.lines;
}

function addStickerEmoji(idx) {
    addLine(gStickersEmoji[idx]);
}

function createLine(text, posX, posY) {
    return {
        text,
        size: 40,
        align: 'left',
        color: '#000000',
        font: 'Impact',
        lineWidth: 2,
        fillColor: '#ffffff',
        posX,
        posY,
    }
}

function setText(text) {
    if (gMeme.lines.length === 0) addLine(text);
    else gMeme.lines[gMeme.selectedLineIdx].text = text;
}

function setTextSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = +size;
}

function setTextFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changePos(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].posY + diff < 0 - diff ||
        gMeme.lines[gMeme.selectedLineIdx].posY + diff > gImgs[gMeme.selectedImgId].imgObj.height) return
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
}

function switchLine(line) {
    if (line) gMeme.selectedLineIdx = line;
    else gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1 >= gMeme.lines.length ? 0 : gMeme.selectedLineIdx + 1;
    return gMeme.lines[gMeme.selectedLineIdx].text;
}

function setAlign(dir) {
    gMeme.lines[gMeme.selectedLineIdx].align = dir;
}

function setOutlineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setSearch(value) {
    gFilterBy = value.toLowerCase();
}

function setKeyword(value) {
    gKeywords[value]++;
}

function addLine(text = 'Your Text Here...') {
    var height = gMeme.lines.length > 1 ? gImgs[gMeme.selectedImgId].imgObj.height / 2 :
        gMeme.lines.length === 0 ? 50 : gElCanvas.height - 20;
    gMeme.lines.push(createLine(text, gElCanvas.width / 7, height));
    switchLine(gMeme.lines.length - 1)
}

function addStickerImage(img) {
    gMeme.stickers.push(createSticker(img, gElCanvas.width / 2, gElCanvas.height / 2));
}

function createSticker(img, posX, posY) {
    return {
        img,
        posX,
        posY,
        size: 50,
        width: 50
    }
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = gMeme.lines.length > 0 ? gMeme.lines.length - 1 : 0;
}

function createImgs() {
    createImg(0, 'img/memes-v/1.jpg', ['lady', 'nature', 'freedom', 'cheerful', 'mountain', 'dance'])
    createImg(1, 'img/memes-v/2.jpg', ['donald', 'trump', 'angry', 'furious', 'fire', 'president'])
    createImg(2, 'img/memes-v/3.jpg', ['dog', 'baby', 'bed', 'calm', 'white'])
    createImg(3, 'img/memes-v/4.jpg', ['dog', 'kiss', 'puppy'])
    createImg(4, 'img/memes-v/5.jpg', ['success', 'kid', 'beach', 'yes'])
    createImg(5, 'img/memes-v/6.jpg', ['cat', 'laptop', 'sleepy'])
    createImg(6, 'img/memes-v/7.jpg', ['oz', 'magic', 'magician', 'purple'])
    createImg(7, 'img/memes-v/8.jpg', ['devil', 'sneaky', 'kid', 'grass'])
    createImg(8, 'img/memes-v/9.jpg', ['fool', 'chaim', 'freier'])
    createImg(9, 'img/memes-v/11.jpg', ['history', 'scientist', 'hair'])
    createImg(10, 'img/memes-v/12.jpg', ['minime', 'movie', 'bald'])
    createImg(11, 'img/memes-v/13.jpg', ['kids', 'dance', 'africa', 'naked'])
    createImg(12, 'img/memes-v/14.jpg', ['donald', 'trump', 'angry', 'mad', 'furious', 'president'])
    createImg(13, 'img/memes-v/15.jpg', ['kid', 'surprise', 'shock'])
    createImg(14, 'img/memes-v/16.jpg', ['dog', 'puppy'])
    createImg(15, 'img/memes-v/17.jpg', ['barak', 'obama', 'president'])
    createImg(16, 'img/memes-v/18.jpg', ['wrestle', 'fight'])
    createImg(17, 'img/memes-v/19.jpg', ['success', 'leonardo', 'movie'])
    createImg(18, 'img/memes-v/20.jpg', ['matrix', 'movie', 'eye'])
    createImg(19, 'img/memes-v/21.jpg', ['movie', 'lord', 'ring'])
    createImg(20, 'img/memes-v/22.jpg', ['opera', 'talkshow', 'success', 'scream'])
    createImg(21, 'img/memes-v/23.jpg', ['star', 'trek', 'funny', 'joke', 'captain'])
    createImg(22, 'img/memes-v/24.jpg', ['president', 'putin', 'russia'])
    createImg(23, 'img/memes-v/25.jpg', ['movie', 'toy', 'buzz', 'woodie', 'pixar'])
}

function createImg(id, url, keywords) {
    var img = new Image();
    img.src = url;
    gImgs.push({
        id,
        imgObj: img,
        keywords
    })
}

function getKeywords() {
    var maxMode = 0;
    var keywordMapObj = gImgs.reduce((acc, img) => {
        for (let i = 0; i < img.keywords.length; i++) {
            if (!acc[img.keywords[i]]) acc[img.keywords[i]] = 0;
            acc[img.keywords[i]]++;
            if (acc[img.keywords[i]] > maxMode) maxMode = acc[img.keywords[i]];
        }
        return acc;
    }, {})

    gKeywords = keywordMapObj;
}

function downloadMeme() {
    return getFinalCanvas();
}

function saveMeme() {
    var stickers = (gMeme.stickers) ? gMeme.stickers.map(sticker => {
        return {
            img: sticker.img.currentSrc,
            posX: sticker.posX,
            posY: sticker.posY,
            size: sticker.size,
            width: sticker.width
        }
    }) : []
    var meme = {
        selectedImgId: gMeme.selectedImgId,
        selectedLineIdx: gMeme.selectedLineIdx,
        selectedStickerIdx: gMeme.selectedStickerIdx,
        lines: gMeme.lines,
        stickers: stickers,
        data: getFinalCanvas()
    }
    var memes = loadMemesFromStorage(STORAGE_KEY) || [];
    if (gMeme.saveIdx >= 0) memes[gMeme.saveIdx] = meme;
    else memes.push(meme);
    saveMemesToStorage(STORAGE_KEY, memes)
}

function loadMeme(idx) {
    var memes = loadMemesFromStorage(STORAGE_KEY) || [];
    createMeme(memes[idx]);
    gMeme.saveIdx = idx;
}