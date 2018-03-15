const URL ="https://api.coinmarketcap.com/v1/ticker/" // top 100 coins on coinMarketCap


// function myFunction(){
// console.log(query);
//
// }
function getDataFromApi(callback){
  console.log(callback);
  const query = {
    url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
    dataTyape: 'json',
    type: 'Get',
    success: callback

  };

  $.ajax(query);
}

getDataFromApi(displayCryptoData);

function displayCryptoData(data){
// var myCrpto = JSON.stringify(data)
// for (let i =0 ; i < data.length; i++){
// console.log(data[i].name);
// var cryptoName = data[i].name
// $("#data").append(`<div>${cryptoName}</div><p> Hi there </p>`);
// }
data.forEach(function(element){
  console.log(element.name);
});

}

displayCryptoData();
