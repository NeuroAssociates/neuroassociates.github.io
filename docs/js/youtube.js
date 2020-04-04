function openMovie(url) {
    var code = "<div id=\"cover_things\">"
        + "<div id=\"cover_things_back\" onclick=\"closeMovie()\"></div>"
        + "<div id=\"cover_things_inside\">"
        + "<div id=\"cover_things_close\"><span onclick=\"closeMovie()\">닫기</span></div>"
        + "<div id=\"cover_things_contents\"><iframe width=\"560\" height=\"315\" src=\""
        + "https://www.youtube.com/embed/" + url + "?autoplay=1&rel=0&theme=light\" frameborder=\"0\" allowfullscreen></iframe></div>"
        + "<div id=\"cover_things_close\"></div>"
        + "</div>";
    +"</div>";
    document.body.innerHTML += code;
}

function closeMovie() {
    let element = document.getElementById("cover_things");
    element.parentElement.removeChild(element);
}