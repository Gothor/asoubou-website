const ratio = 1920/1080;

function resizeIframes() {
    for (let iframe of iframes) {
        console.log(iframe);
        iframe.style.display = "none";
        requestAnimationFrame(function() {
            let parent = iframe.parentNode;
            let style = getComputedStyle(parent);
            let w = parseFloat(style.width) - 2 * parseFloat(style.paddingLeft);
            w = parseInt(w);
            let h = w * (1 / ratio);

            iframe.style.display = "initial";
            iframe.width = w;
            iframe.height = h;
        })
    }
}

let iframes = document.getElementsByTagName("iframe");
resizeIframes();

window.addEventListener("resize", resizeIframes);