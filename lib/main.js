document.addEventListener('DOMContentLoaded', initRecents)

function initRecents() {
    let allBlogs = document.getElementsByClassName("preview")
    document.getElementById("recent-one").innerHTML = allBlogs[allBlogs.length-2].innerHTML
    document.getElementById("recent-two").innerHTML = allBlogs[allBlogs.length-1].innerHTML
}