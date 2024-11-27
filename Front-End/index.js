let pageNo = 1;

(function () {

    let smartBasket = document.getElementById('smartBasket')
    let bestSeller = document.getElementById('bestSeller');

    basketCount()

    fetchData("vegetables", smartBasket, pageNo, 4)
    fetchOffer("bankDetails")
    fetchData("bestSeller", bestSeller, pageNo, 4)
    fetchOffer("topOffers")
    fetchOffer("fruit&veg")
    fetchOffer("yourDailyStaples")
    fetchOffer("beverage")
    slider();

})();


async function searchInCollections(searchTerm) {
    try {
        const response = await fetch(`https://bigbasket-clone-app.onrender.com/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const results = await response.json();
        console.log('Search results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}

async function searchHandler(searchTerm) {
    const results = await searchInCollections(searchTerm);
    if (results.length === 0) {
        alert('No results found for your search term.');
        return;
    }

    console.log('saving results : ', results)

    localStorage.setItem('searchResults', JSON.stringify(results)); // Save results in localStorage
    window.location.href = 'searchData.html'; // Redirect to results page
}



function fetchLocation(){
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position) {
      const { latitude, longitude } = position.coords;

      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=1c09c463ed7d432db20a1968c7ef2767`)
        .then(response => response.json())
        .then(data => {
          const locationComponents = data.results[0].components;
          const city = locationComponents.city || locationComponents.town || locationComponents.village ||'';
          const pincode = locationComponents.postcode || '';
          
          console.log(city,pincode)
          const locationText = `${city},${pincode}`

          selectLocation = document.getElementById('selectLocation')
          selectLocation.innerText = locationText

        })
        .catch(error => console.error('Error fetching location:', error));
    }

    function errorCallback() {
        selectLocation = document.getElementById('selectLocation')
        selectLocation.innerText = "Location not Fetched"
      }
}


function pagination(key, name, id) {
    if (key === 'prev' && pageNo > 1) {
        pageNo = pageNo - 1
    }
    else if (key === 'next' && pageNo < 3) {
        pageNo = pageNo + 1
    }

    fetchData(name, id, pageNo, 4)
}

async function fetchData(name, id, pageNo, limit) {

    await fetch(`https://bigbasket-clone-app.onrender.com/${name}?_page=${pageNo}&_limit=${limit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse as JSON
        })
        .then(data => {
            console.log(`Fetched ${name}:`, data);
            console.log(pageNo);
            // Process and display the data
            displayData(data, id);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};


function displayData(result, id) {
    id.innerText = "";
    result.forEach((ele,index) => {
        let div = document.createElement("div")
        div.id = "smartBasketChild";
        
        div.innerHTML = `
            <p id="dis">${ele.discount}%OFF </p>

            <img src=${ele.image} />
            
            <div id=vegSymbol>
                <div></div>
            </div>

            <p id="fresho"> ${ele.fresho} </p>
            <p id="title"> ${ele.name} </p>
            
            <select id="kg-${index}">
                <option value="1">1 kg</option>
                <option value="3">3 kg</option>
                <option value="5">5 kg</option>
            </select>
            
            <div id="org-dis-amt">
                <h4><i class="fa-solid fa-indian-rupee-sign"></i>
                ${ele.original_price - (Math.ceil(ele.original_price * ele.discount / 100))} </h4>
                <p><del><i class="fa-solid fa-indian-rupee-sign"></i>
                ${ele.original_price}</del> </p>
            </div>

            <button id="bookmark"> <i class="fa-regular fa-bookmark"></i> </button>
            
            `
        // <button id="add" onclick="addBasket(${(ele)})"> Add </button>

        let addButton = document.createElement("button");
        addButton.id = "add";
        addButton.textContent = "Add";
        addButton.addEventListener("click", () => {
            const kgValue = document.getElementById(`kg-${index}`).value;
            addBasket({...ele, kg: kgValue})
        });

        div.appendChild(addButton);
        
        id.append(div);
    })
}

//add product in basket
async function addBasket(ele) {
    try {
        let response = await fetch('https://bigbasket-clone-app.onrender.com/basket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ele),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Product is successfully added on your Basket, Please check your Basket');
            console.log('Server Response:', result);

            window.location.reload()
        } else {
            alert('Product is already added on your Basket.');
            console.error('Error:', result);
        }
    } catch (error) {
        console.error('Failed to parse JSON response:', error);
    }
}


// let basketNum = 0;
// let basketCount = document.getElementById('basketCount')
// function increaseCount() {
//     basketCount.innerText = ++basketNum;

//     let exportData = document.getElementById("smartBasketChild").innerHTML
//     localStorage.setItem(`addBtnData`, exportData);
// }

async function basketCount(){
      await fetch('https://bigbasket-clone-app.onrender.com/basket/count')
      .then(response =>{
        return response.json()
      })
      .then(data=>{
        const count = document.getElementById('basketCount')
        count.innerText = data.count
      })
      .catch(error=>{
        console.error(error)
      })
}



//bank offers 

async function fetchOffer(key) {
    let data = await fetch(`https://bigbasket-clone-app.onrender.com/offers/${key}`)
    let result = await data.json();
    console.log(key);
    console.log(result);
    displayOffers(result, key);
}

function displayOffers(result, key) {
    let bankOffer = document.getElementById(key)
    result.forEach((ele) => {
        let div = document.createElement("result")
        div.id = "bankOfferBasket";

        div.innerHTML = `
           <img onclick="searchData('offers/${key}')" src=${ele.image}>
        `
        bankOffer.append(div);
    })
}


async function slider() {
    let data = await fetch("https://bigbasket-clone-app.onrender.com/slider")
    let result = await data.json()

    console.log("slideData = ", result)

    let slideShowContainer = document.getElementById("slideShowContainer")
    let index = 0;

    const images = result.map(item => new Image());
    images.forEach((img, idx) => img.src = result[idx].image);

    function showSlide(index) {
        // slideShowContainer.innerHTML = `<img src=${result[index].image} >`
        slideShowContainer.innerHTML = '';
        slideShowContainer.appendChild(images[index]);
    }

    function nextSlide() {
        index = (index + 1) % result.length;
        showSlide(index)
    }

    showSlide(index)

    setInterval(nextSlide, 2000)

}


let storedNames = localStorage.getItem('name');
window.onload = () => {
    if (storedNames) {
        let login = document.getElementById('loginBtn')
        let name = localStorage.getItem('name');
        login.innerHTML = `<i class="fa-regular fa-user"></i> ${name}`;
    }
}


function searchData(optionValue) {
    if (optionValue) {
        window.location.href = "searchData.html?option=" + optionValue;
    }
}


function offers(optionName) {
    window.location.href = "searchData.html?option=" + optionName;
}






