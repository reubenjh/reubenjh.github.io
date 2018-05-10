$(document).ready(function(){
    $("iframe").load(function() {
        getContent();
    });
});

function getContent() {
    let allBlogs = document.getElementById("iframe").contentDocument.getElementById("thumbnails");
    console.log(allBlogs)
}
/*

document.addEventListener('DOMContentLoaded', initRecents)

function initRecents() {

    let allBlogs = document.getElementById("framy").contentWindow.document.getElementsByClassName("preview")
    console.log(allBlogs)

    //let allBlogs = document.getElementsByClassName("preview")
    //document.getElementById("recent-one").innerHTML = allBlogs[allBlogs.length-2].innerHTML
    //document.getElementById("recent-two").innerHTML = allBlogs[allBlogs.length-1].innerHTML
}
*/