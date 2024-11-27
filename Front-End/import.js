window.onload= function (){
    let importData = localStorage.getItem('navbar');
    document.getElementById('importHeading').innerHTML = importData;

    let footerData = localStorage.getItem('footer')
    document.getElementById('footerImport').innerHTML = footerData;
    
}