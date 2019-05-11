const ratio = 1920/1080;
let iframes;

function resizeIframes(hide) {
    for (let iframe of iframes) {
        if (hide) iframe.style.display = "none";
        requestAnimationFrame(function() {
            let parent = iframe.parentNode;
            let style = getComputedStyle(parent);
            let w = parseFloat(style.width) - 2 * parseFloat(style.paddingLeft);
            w = parseInt(w);
            let h = w * (1 / ratio);

            if (hide) iframe.style.display = "initial";
            iframe.width = w;
            iframe.height = h;
        })
    }
}

document.addEventListener('DOMContentLoaded', e => {
    iframes = document.getElementsByTagName("iframe");
    resizeIframes(true);
    window.addEventListener("resize", resizeIframes);
});