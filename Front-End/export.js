window.onload = function(){
    let exportData = document.getElementById('container').innerHTML
    let footerData = document.getElementById('contactUs').innerHTML
    localStorage.setItem('navbar',exportData)
    localStorage.setItem('footer',footerData)
}
