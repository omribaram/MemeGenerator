'use-strict'

var imgRender = (src, callback) => {
    var img = new Image();
    img.onload = () => {
        callback(img.src)
    };
    img.src = src;
};

var stickerRender = (src, callback) => {
    var img = new Image();
    img.onload = () => {
        callback(img)
    };
    img.src = src;
};

var draggedImage = (imgFile) => {
    if (!imgFile.type.match(/image.*/)) return

    var reader = new FileReader();
    reader.onload = (ev) => {
        imgRender(ev.target.result, onImgDrag);
    };
    reader.readAsDataURL(imgFile);
}

var draggedSticker = (imgFile) => {
    if (!imgFile.type.match(/image.*/)) return

    var reader = new FileReader();
    reader.onload = (ev) => {
        stickerRender(ev.target.result, onAddStickerImage);
    };
    reader.readAsDataURL(imgFile);
}

function onUploadImage(evt) {
    var reader = new FileReader();
    reader.onload = function(ev) {
        var img = new Image();
        img.onload = function() {
            imgRender(ev.target.result, onImgDrag);
        }
        img.src = ev.target.result;
    }
    reader.readAsDataURL(evt.target.files[0]);
}