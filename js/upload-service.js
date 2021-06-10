'use-strict'

function imgUpload(ev, callback) {
    if (ev.target.files) {
        let imageFile = ev.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function(evt) {
            var img = new Image();
            img.src = evt.target.result
            img.onload = () => {
                gImgs.push(callback.bind()(gImgs.length - 1, img.src, ['test']))
                onCreateMeme(gImgs.length - 1)
            }
        }
    }
}