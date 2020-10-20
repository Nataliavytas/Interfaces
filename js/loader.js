window.onload = function() {
    setTimeout(endLoader, 3000)
}

function endLoader() {
    loader = document.querySelector('.loader-container');
    webBody = document.querySelector('.web-body');
    loader.style.display = "none";
    webBody.style.visibility = "visible";
}