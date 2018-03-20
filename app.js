const coinUrl ="https://api.coinmarketcap.com/v1/ticker/?limit=15" // top 10 coins on coinMarketCap
const marketCapUrl ="https://api.coinmarketcap.com/v1/global/" // gobal marketcap

let allCoinData = [];


function getCoinDataFromApi(callback){
  // console.log(callback);
  const query = {
    url: coinUrl,
    dataType: 'json',
    type: 'Get',
    success: function (data){
      allCoinData = data
      callback(data);
    }

  }
  $.ajax(query);

}

function getMarketCapData(callback){

  const query ={
    url: marketCapUrl,
    dataType: 'json',
    type: 'Get',
    success: callback
  };
  $.ajax(query);

}

getCoinDataFromApi(formatCryptoCoinData);
getMarketCapData(displayMarketCapData);

function formatCryptoCoinData(data){

   const formattedData = data.map(crypto =>{
     return {
       name: crypto.name,
       usdPrice: crypto.price_usd,
       oneHour: crypto.percent_change_1h

     }
   })
   displayCryptoData(formattedData);
  }


function displayCryptoData(formattedData){
  $(".data").empty();
  for (let i = 0; i < formattedData.length; i++){
    let crypto = formattedData[i];
      $(".data").append(`
         <div class ="cryptoCards">
           <h2 class ="cryptoName">${crypto.name}</h2> Current price is $ ${crypto.usdPrice}
           <br>${crypto.name}'s 1 hour change is ${crypto.oneHour}%`
         )

  }
}

function filterCoinData(term){
  const filterd = allCoinData.filter(coin => {
    return coin.name.toLowerCase() == term.toLowerCase();
  })
  formatCryptoCoinData(filterd);
}

function toggleChange() {
  const filtered = allCoinData.filter(coin => {
    return +coin.percent_change_24h > 0
  })
  formatCryptoCoinData(filtered)
}

function displayMarketCapData(data){
  var formattedData = data;
  var value = formattedData.toLocaleString({

  });
  console.log(value);
  $(".marketCapData").append(
    `<h3>${data.total_market_cap_usd.toLocaleString()}</h3> Current Market Cap`
    )

  }



$(function () {
  $(".js-search-form").submit(event => {

    event.preventDefault();
    const userSearch = $(".jsSearch").val()
    filterCoinData(userSearch);
    $(".jsSearch").val("")
  });
  $(".showChange").change(event => {
    console.log("checked");
    if ($(".showChange").is(":checked")){
      console.log("hi");
      toggleChange()
    }
    else {
      formatCryptoCoinData(allCoinData);
    }
  })
  $(".clearButton").click(event =>{
    event.preventDefault();
    $(".showChange").prop('checked', false);
    formatCryptoCoinData(allCoinData);
  })
});
