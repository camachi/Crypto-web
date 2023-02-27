var btc = document.getElementById("bitcoin")
var eth = document.getElementById("ether")
var btc_cap = document.getElementById("bitcoin-cap")
var eth_cap = document.getElementById("ether-cap")
var crypto_cap =document.getElementById("crypto-cap")
var cryptoc= 0;

const api_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

async function getINFO(){
const response = await fetch(api_url);
const data = await response.json();
console.log(data);
btc.innerHTML =data[0].current_price;
btc_cap.innerHTML = data[0].market_cap;
eth.innerHTML = data[1].current_price;
eth_cap.innerHTML = data[1].market_cap;
if(cryptoc>0)
{
cryptoc=0;
}
for (let i = 0; i < data.length; i++)
{
cryptoc += data[i].market_cap;

}
crypto_cap.innerHTML= cryptoc;

for (let i = 0; i < data.length; i++)
{
addnew(data[i].name,data[i].current_price,data[i].image)

}

}
getINFO();
//setInterval(getINFO, 20000);
const DIVcoins = document.getElementById("coins-container")
function addnew(a,b,d)
{
const newDIV = document.createElement("div");
newDIV.classList.add('coins');
DIVcoins.appendChild(newDIV);
newDIV.innerHTML= "<img src='"+ d +"' alt='test' width='50px' height='50px'>" + "</br>" + a +"</br> $"+ b;  
}









