function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

document.addEventListener('DOMContentLoaded', e => {
    const resizeIframes = (hide) => {
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

    const onScroll = (e) => {
        if (scrollY > navTop) {
            nav.classList.add('fix');
        } else {
            nav.classList.remove('fix');
        }
    }

    // Resize iframes when window is resized
    const ratio = 1920/1080;
    let iframes;

    iframes = document.getElementsByTagName("iframe");
    resizeIframes(true);
    window.addEventListener("resize", resizeIframes);

    // Fix nav to top of the screen when scrolling
    const nav = document.getElementsByTagName('nav')[0];
    const navTop = getOffset(nav).top;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    const sheet = style.sheet;
    const navHeight = parseInt(getComputedStyle(nav).height);
    sheet.insertRule(`nav.fix + .wrapper { padding-top: ${ navHeight }px; }`);
    document.addEventListener('scroll', onScroll);
});