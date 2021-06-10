'use-strict'

const STORAGE_KEY = 'memesDB';
const PAGE_SIZE = 5;
var gImgs = createImgs()
var gKeywords = _getKeywords()
var gMeme;
var gFilterBy;
var gStickers = ['⌚', '⌛', '⏩', '⏪', '⏫', '⏬', '⏭', '⏮', '⏯', '⏰', '⏱', '⏲', '⏳', '⏸', '⏹', '⏺', 'Ⓜ', '☔', '☕', '☝', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '♟', '♿', '⚓', '⚡', '⚪', '⚫', '⚽', '⚾', '⛄', '⛅', '⛎', '⛏', '⛑', '⛓', '⛔', '⛩', '⛪', '⛰', '⛱', '⛲', '⛳', '⛴', '⛵', '⛷', '⛸', '⛹', '⛺', '⛽', '✂', '✅', '✈', '✉', '✊', '✋', '✌', '✍', '✏', '✒', '✔', '✖', '✝', '✡', '✨', '✳', '✴', '❄', '❇', '❌', '❎', '❓', '❔', '❕', '❗', '❣', '❤', '➕', '➖', '➗', '➡', '➰', '➿', '⤴', '⤵', '⬅', '⬆', '⬇', '⬛', '⬜', '⭐', '⭕', '〰', '〽', '㊗', '㊙', '🀄', '🃏', '🅰', '🅱', '🅾', '🅿', '🆎', '🆑', '🆒', '🆓', '🆔', '🆕', '🆖', '🆗', '🆘', '🆙', '🆚', '🈁', '🈂', '🈚', '🈯', '🈲', '🈳', '🈴', '🈵', '🈶', '🈷', '🈸', '🈹', '🈺', '🉐', '🉑', '🌀', '🌁', '🌂', '🌃', '🌄', '🌅', '🌆', '🌇', '🌈', '🌉', '🌊', '🌋', '🌌', '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '🌝', '🌞', '🌟', '🌠', '🌡', '🌤', '🌥', '🌦', '🌧', '🌨', '🌩', '🌪', '🌫', '🌬', '🌭', '🌮', '🌯', '🌰', '🌱', '🌲', '🌳', '🌴', '🌵', '🌶', '🌷', '🌸', '🌹', '🌺', '🌻', '🌼', '🌽', '🌾', '🌿', '🍀', '🍁', '🍂', '🍃', '🍄', '🍅', '🍆', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🍔', '🍕', '🍖', '🍗', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍞', '🍟', '🍠', '🍡', '🍢', '🍣', '🍤', '🍥', '🍦', '🍧', '🍨', '🍩', '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🍰', '🍱', '🍲', '🍳', '🍴', '🍵', '🍶', '🍷', '🍸', '🍹', '🍺', '🍻', '🍼', '🍽', '🍾', '🍿', '🎀', '🎁', '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎', '🎏', '🎐', '🎑', '🎒', '🎓', '🎖', '🎗', '🎙', '🎚', '🎛', '🎞', '🎟', '🎠', '🎡', '🎢', '🎣', '🎤', '🎥', '🎦', '🎧', '🎨', '🎩', '🎪', '🎫', '🎬', '🎭', '🎮', '🎯', '🎰', '🎱', '🎲', '🎳', '🎴', '🎵', '🎶', '🎷', '🎸', '🎹', '🎺', '🎻', '🎼', '🎽', '🎾', '🎿', '🏀', '🏁', '🏂', '🏃', '🏄', '🏅', '🏆', '🏇', '🏈', '🏉', '🏊', '🏋', '🏌', '🏍', '🏎', '🏏', '🏐', '🏑', '🏒', '🏓', '🏔', '🏕', '🏖', '🏗', '🏘', '🏙', '🏚', '🏛', '🏜', '🏝', '🏞', '🏟', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🏰', '🏳', '🏴', '🏵', '🏷', '🏸', '🏹', '🏺', '🏻', '🏼', '🏽', '🏾', '🏿', '🐀', '🐁', '🐂', '🐃', '🐄', '🐅', '🐆', '🐇', '🐈', '🐉', '🐊', '🐋', '🐌', '🐍', '🐎', '🐏', '🐐', '🐑', '🐒', '🐓', '🐔', '🐕', '🐖', '🐗', '🐘', '🐙', '🐚', '🐛', '🐜', '🐝', '🐞', '🐟', '🐠', '🐡', '🐢', '🐣', '🐤', '🐥', '🐦', '🐧', '🐨', '🐩', '🐪', '🐫', '🐬', '🐭', '🐮', '🐯', '🐰', '🐱', '🐲', '🐳', '🐴', '🐵', '🐶', '🐷', '🐸', '🐹', '🐺', '🐻', '🐼', '🐽', '🐾', '🐿', '👀', '👁', '👂', '👃', '👄', '👅', '👆', '👇', '👈', '👉', '👊', '👋', '👌', '👍', '👎', '👏', '👐', '👑', '👒', '👓', '👔', '👕', '👖', '👗', '👘', '👙', '👚', '👛', '👜', '👝', '👞', '👟', '👠', '👡', '👢', '👣', '👤', '👥', '👦', '👧', '👨', '👩', '👪', '👫', '👬', '👭', '👮', '👯', '👰', '👱', '👲', '👳', '👴', '👵', '👶', '👷', '👸', '👹', '👺', '👻', '👼', '👽', '👾', '👿', '💀', '💁', '💂', '💃', '💄', '💅', '💆', '💇', '💈', '💉', '💊', '💋', '💌', '💍', '💎', '💏', '💐', '💑', '💒', '💓', '💔', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '💝', '💞', '💟', '💠', '💡', '💢', '💣', '💤', '💥', '💦', '💧', '💨', '💩', '💪', '💫', '💬', '💭', '💮', '💯', '💰', '💱', '💲', '💳', '💴', '💵', '💶', '💷', '💸', '💹', '💺', '💻', '💼', '💽', '💾', '💿', '📀', '📁', '📂', '📃', '📄', '📅', '📆', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '📏', '📐', '📑', '📒', '📓', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📛', '📜', '📝', '📞', '📟', '📠', '📡', '📢', '📣', '📤', '📥', '📦', '📧', '📨', '📩', '📪', '📫', '📬', '📭', '📮', '📯', '📰', '📱', '📲', '📳', '📴', '📵', '📶', '📷', '📸', '📹', '📺', '📻', '📼', '📽', '📿', '🔀', '🔁', '🔂', '🔃', '🔄', '🔅', '🔆', '🔇', '🔈', '🔉', '🔊', '🔋', '🔌', '🔍', '🔎', '🔏', '🔐', '🔑', '🔒', '🔓', '🔔', '🔕', '🔖', '🔗', '🔘', '🔙', '🔚', '🔛', '🔜', '🔝', '🔞', '🔟', '🔠', '🔡', '🔢', '🔣', '🔤', '🔥', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '🔬', '🔭', '🔮', '🔯', '🔰', '🔱', '🔲', '🔳', '🔴', '🔵', '🔶', '🔷', '🔸', '🔹', '🔺', '🔻', '🔼', '🔽', '🕉', '🕊', '🕋', '🕌', '🕍', '🕎', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧', '🕯', '🕰', '🕳', '🕴', '🕵', '🕶', '🕷', '🕸', '🕹', '🕺', '🖇', '🖊', '🖋', '🖌', '🖍', '🖐', '🖕', '🖖', '🖤', '🖥', '🖨', '🖱', '🖲', '🖼', '🗂', '🗃', '🗄', '🗑', '🗒', '🗓', '🗜', '🗝', '🗞', '🗡', '🗣', '🗨', '🗯', '🗳', '🗺', '🗻', '🗼', '🗽', '🗾', '🗿', '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑', '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣', '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬', '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀', '🙁', '🙂', '🙃', '🙄', '🙅', '🙆', '🙇', '🙈', '🙉', '🙊', '🙋', '🙌', '🙍', '🙎', '🙏', '🚀', '🚁', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚋', '🚌', '🚍', '🚎', '🚏', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🚚', '🚛', '🚜', '🚝', '🚞', '🚟', '🚠', '🚡', '🚢', '🚣', '🚤', '🚥', '🚦', '🚧', '🚨', '🚩', '🚪', '🚫', '🚬', '🚭', '🚮', '🚯', '🚰', '🚱', '🚲', '🚳', '🚴', '🚵', '🚶', '🚷', '🚸', '🚹', '🚺', '🚻', '🚼', '🚽', '🚾', '🚿', '🛀', '🛁', '🛂', '🛃', '🛄', '🛅', '🛋', '🛌', '🛍', '🛎', '🛏', '🛐', '🛑', '🛒', '🛠', '🛡', '🛢', '🛣', '🛤', '🛥', '🛩', '🛫', '🛬', '🛰', '🛳', '🛴', '🛵', '🛶', '🛷', '🛸', '🛹', '🛺', '🤐', '🤑', '🤒', '🤓', '🤔', '🤕', '🤖', '🤗', '🤘', '🤙', '🤚', '🤛', '🤜', '🤝', '🤞', '🤟', '🤠', '🤡', '🤢', '🤣', '🤤', '🤥', '🤦', '🤧', '🤨', '🤩', '🤪', '🤫', '🤬', '🤭', '🤮', '🤯', '🤰', '🤱', '🤲', '🤳', '🤴', '🤵', '🤶', '🤷', '🤸', '🤹', '🤺', '🤼', '🤽', '🤾', '🥀', '🥁', '🥂', '🥃', '🥄', '🥅', '🥇', '🥈', '🥉', '🥊', '🥋', '🥌', '🥍', '🥎', '🥏', '🥐', '🥑', '🥒', '🥓', '🥔', '🥕', '🥖', '🥗', '🥘', '🥙', '🥚', '🥛', '🥜', '🥝', '🥞', '🥟', '🥠', '🥡', '🥢', '🥣', '🥤', '🥥', '🥦', '🥧', '🥨', '🥩', '🥪', '🥫', '🦀', '🦁', '🦂', '🦃', '🦄', '🦅', '🦆', '🦇', '🦈', '🦉', '🦊', '🦋', '🦌', '🦍', '🦎', '🦏', '🦐', '🦑', '🦒', '🦓', '🦔', '🦕', '🦖', '🦗', '🧀', '🧐', '🧑', '🧒', '🧓', '🧔', '🧕', '🧖', '🧗', '🧘', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '🧠', '🧡', '🧢', '🧣', '🧤', '🧥', '🧦']
var gPageIdx = 0;

function createMeme(meme, imgId) {
    if (meme) gMeme = meme;
    else gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [createLine('Your Text Here...', 150, 50), createLine('Your Text Here...', 150, gImgs[imgId].imgObj.height - 20)]
    }
}

function movePage(diff) {
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE >= gStickers.length) gPageIdx = 0;
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
    return gStickers.slice(startIdx, startIdx + PAGE_SIZE);
}

function getImgforCanvas() {
    return gImgs[gMeme.selectedImgId]
}

function getLinesforCanvas() {
    return gMeme.lines;
}

function addSticker(idx) {
    addLine(gStickers[idx]);
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
    gMeme.lines[gMeme.selectedLineIdx].text = text;
}

function setTextSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = +size;
}

function changePos(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].posY + diff < 0 - diff ||
        gMeme.lines[gMeme.selectedLineIdx].posY + diff > gImgs[gMeme.selectedImgId].imgObj.height) return
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
}

// function switchLine(line = gMeme.selectedLineIdx + 1 >= gMeme.lines.length ? 0 : gMeme.selectedLineIdx + 1) {
//     gMeme.selectedLineIdx = line;
//     return gMeme.lines[gMeme.selectedLineIdx].text;
// }

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
    gFilterBy = value;
}

function setKeyword(value) {
    gKeywords[value]++;
}

function addLine(text = 'Your Text Here...') {
    gMeme.lines.push(createLine(text, 150, gImgs[gMeme.selectedImgId].imgObj.height / 2));
    switchLine(gMeme.lines.length - 1)
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = gMeme.lines.length > 0 ? gMeme.lines.length - 1 : 0;
}

function createImgs() {
    var imgs = []
    imgs.push(createImg(0, 'img/memes-v/1.jpg', ['lady', 'nature', 'freedom', 'cheerful', 'mountain', 'dance']))
    imgs.push(createImg(1, 'img/memes-v/2.jpg', ['donald', 'trump', 'angry', 'furious', 'fire', 'president']))
    imgs.push(createImg(2, 'img/memes-v/3.jpg', ['dog', 'baby', 'bed', 'calm', 'white']))
    imgs.push(createImg(3, 'img/memes-v/4.jpg', ['dog', 'kiss', 'puppy']))
    imgs.push(createImg(4, 'img/memes-v/5.jpg', ['success', 'kid', 'beach', 'yes']))
    imgs.push(createImg(5, 'img/memes-v/6.jpg', ['cat', 'laptop', 'sleepy']))
    imgs.push(createImg(6, 'img/memes-v/7.jpg', ['oz', 'magic', 'magician', 'purple']))
    imgs.push(createImg(7, 'img/memes-v/8.jpg', ['devil', 'sneaky', 'kid', 'grass']))
    imgs.push(createImg(8, 'img/memes-v/9.jpg', ['fool', 'chaim', 'freier']))
    imgs.push(createImg(9, 'img/memes-v/11.jpg', ['history', 'scientist', 'hair']))
    imgs.push(createImg(10, 'img/memes-v/12.jpg', ['minime', 'movie', 'bald']))
    imgs.push(createImg(11, 'img/memes-v/13.jpg', ['kids', 'dance', 'africa', 'naked']))
    imgs.push(createImg(12, 'img/memes-v/14.jpg', ['donald', 'trump', 'angry', 'mad', 'furious', 'president']))
    imgs.push(createImg(13, 'img/memes-v/15.jpg', ['kid', 'surprise', 'shock']))
    imgs.push(createImg(14, 'img/memes-v/16.jpg', ['dog', 'puppy']))
    imgs.push(createImg(15, 'img/memes-v/17.jpg', ['barak', 'obama', 'president']))
    imgs.push(createImg(16, 'img/memes-v/18.jpg', ['wrestle', 'fight']))
    imgs.push(createImg(17, 'img/memes-v/19.jpg', ['success', 'leonardo', 'movie']))
    imgs.push(createImg(18, 'img/memes-v/20.jpg', ['matrix', 'movie', 'eye']))
    imgs.push(createImg(19, 'img/memes-v/21.jpg', ['movie', 'lord', 'ring']))
    imgs.push(createImg(20, 'img/memes-v/22.jpg', ['opera', 'talkshow', 'success', 'scream']))
    imgs.push(createImg(21, 'img/memes-v/23.jpg', ['star', 'trek', 'funny', 'joke', 'captain']))
    imgs.push(createImg(22, 'img/memes-v/24.jpg', ['president', 'putin', 'russia']))
    imgs.push(createImg(23, 'img/memes-v/25.jpg', ['movie', 'toy', 'buzz', 'woodie', 'pixar']))
    return imgs;
}

function createImg(id, url, keywords) {
    var img = new Image();
    img.src = url;
    img.onload;
    return {
        id,
        imgObj: img,
        keywords
    }
}

function _getKeywords() {
    var maxMode = 0;
    var keywordMapObj = gImgs.reduce((acc, img) => {
        for (let i = 0; i < img.keywords.length; i++) {
            if (!acc[img.keywords[i]]) acc[img.keywords[i]] = 0;
            acc[img.keywords[i]]++;
            if (acc[img.keywords[i]] > maxMode) maxMode = acc[img.keywords[i]];
        }
        return acc;
    }, {})

    return keywordMapObj;
}

function downloadMeme() {
    return getFinalCanvas();
}

function saveMeme() {
    var meme = {
        selectedImgId: gMeme.selectedImgId,
        selectedLineIdx: gMeme.selectedLineIdx,
        lines: gMeme.lines,
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