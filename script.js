
var crypto_cap =document.getElementById("crypto-cap")
var cryptoSumaMarketCap= 0;
const DIVcoins = document.getElementById("coins-container")
const TableCoins = document.getElementById("coins-table")
const api_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const toggleBtn = document.getElementById("toggleView");
let currentView = 'table';
var datosDelApi = null;

    toggleBtn.addEventListener("click", () => {
    currentView = currentView === 'table' ? 'card' : 'table';
    toggleBtn.innerText = currentView === 'table' ? "Card View" : "Table View";
    toggleBtn.classList.remove('btn-table', 'btn-card');
    toggleBtn.classList.add(currentView === 'table' ? 'btn-table' : 'btn-card');
    clearViews();
    displayData();
    });

    function displayData() {
        if (!datosDelApi) return;
        if (currentView === 'table') {
            tableFormInfo(datosDelApi);
        } else {
            cardFormInfo(datosDelApi);
        }
    }
    //Clear the div
    function clearViews() {
        DIVcoins.innerHTML = '';
        
        cryptoSumaMarketCap = 0;
    }

    //API call
    async function getINFO(){
    try{
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    datosDelApi = data;
    displayData();
    }
    catch(error)
    {   
    console.log("Error en la llamada del api" + error);
    }


    }

    //Mobile version wen load page
    window.addEventListener("load", () => {
        if (window.innerWidth < 600) {
          currentView = "card";
         
          clearViews();
          displayData();
          
        }
      });
    // Resize change to card
      window.addEventListener("resize", () => {
        if (window.innerWidth < 600 && currentView !== "card") {
          currentView = "card";
          clearViews();
          displayData();
        } 
      });

//Display Info Table Form
function tableFormInfo(datos)
{       
const table = document.createElement("table");
table.id = "coins-table";
table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
        </tr>
    `;
for(let i = 0; i < datos.length; i++)
{   
cryptoSumaMarketCap += datos[i].market_cap;
const newtr = document.createElement("tr")
newtr.innerHTML = `<th>${i + 1}</th>
<th><img src='${datos[i].image}' alt='${datos[i].id}' width='50px' height='50px'></th>
<th>${datos[i].name}</th>
<th>${datos[i].current_price.toLocaleString('en-US')}</th>
<th>${datos[i].market_cap.toLocaleString('en-US')}</th>`;
table.appendChild(newtr);
}
DIVcoins.appendChild(table);
//Asignando el MARKET CAP en el nav
crypto_cap.innerHTML= cryptoSumaMarketCap.toLocaleString('en-US');
}

//Display Info Card Form
function cardFormInfo(data)
{
for(let i = 0 ; i < data.length; i++)
{
cryptoSumaMarketCap += data[i].market_cap;
const newDIV = document.createElement("div");
newDIV.classList.add('coins');
newDIV.id = `coin-${data[i].id}`;
DIVcoins.appendChild(newDIV);
newDIV.innerHTML = `<img src='${data[i].image}' alt='${data[i].name}' width='50px' height='50px'><p>#${i + 1}<p>${data[i].name}<br>$${data[i].current_price.toLocaleString('en-US')}`;
}
//Asignando el MARKET CAP en el nav
crypto_cap.innerHTML= cryptoSumaMarketCap.toLocaleString('en-US');

}



getINFO();






//
//CAMACHI :)
//  








