const urlParams = new URLSearchParams(window.location.search);
const optionValue = urlParams.get('option');
console.log(optionValue);

(async function resultData() {
    try{
        if(!optionValue){
            throw new Error("Invalid 'option' parameter in URL")
        }

        let data = await fetch(`http://localhost:3001/${optionValue}?_page=1&_limit=15`)
        if(!data.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        let result = await data.json();
    
        console.log("result data = ",result);
    
        let resultDiv = document.getElementById('resultDiv')
    
        displayData(result, resultDiv);
    }
    catch(error){
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please try again later.");
    }

})();

// (function displayResult(){
//     const results = JSON.parse(localStorage.getItem('searchResults'))
//     console.log('Retrieved Search Results:', results);

//     if (!results || results.length === 0) {
//         resultDiv.innerText = "No results found.";
//         return;
//     }

//     const resultDiv = document.getElementById('resultDiv');
//     displayData(results,resultDiv)

// })()


window.onload = function () {
    let importData = localStorage.getItem('navbar');
    document.getElementById('importHeading').innerHTML = importData;

    let footerData = localStorage.getItem('footer');
    document.getElementById('footerImport').innerHTML = footerData;
}



