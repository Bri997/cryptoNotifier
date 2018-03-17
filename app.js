const COINURL ="https://api.coinmarketcap.com/v1/ticker/?limit=10" // top 10 coins on coinMarketCap
const MARKETCAPURL =" https://api.coinmarketcap.com/v1/global/" // gobal marketcap

function getDataFromApi(callback){
  // console.log(callback);
  const query = {
    url: COINURL,
    dataType: 'json',
    type: 'Get',
    success: callback
  };
  $.ajax(query);
}

// function getMarketCapData(callback){
//   const query ={
//     url: MARKETCAPURL,
//     dataType: 'json',
//     type: 'Get',
//     success: callback
//   };
//   $.ajax(query)
// }

getDataFromApi(displayCryptoData);
// getMarketCapData(dipslayMarketCapData);

function displayCryptoData(data){

  for (let i = 0; i < data.length; i++){

    var cryptoName = data[i].name;
    var cryptoPriceUSD = data[i].price_usd
    var cryptoPercentChange1hr = data[i].percent_change_1h
    var cryptoPercentChange24hr = data[i].percent_change_24h

      $(".data").append(`
        <div class ="cryptoCards">
          <h2 class ="cryptoName">${cryptoName}</h2> Current price is ${cryptoPriceUSD}<br>
          1 hour perecent change is ${cryptoPercentChange1hr}<br>
          24 hour change is ${cryptoPercentChange24hr}% <br></div>`

        );

      }

}
