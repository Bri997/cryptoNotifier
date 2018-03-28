const coinUrl ="https://api.coinmarketcap.com/v1/ticker/?limit=10" // top 10 coins on coinMarketCap
const marketCapUrl ="https://api.coinmarketcap.com/v1/global/" // gobal marketcap
const apiKey = "AIzaSyDi8P6Mcr_qrUcgI8tQBrR-4B-3IY_ewZc"
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

let allCoinData = [];



function getCoinDataFromApi(callback){

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

function getYoutubeData(callback, term) {

  const query = {
    url: youtubeURL,
      data: {
        maxResults: "5",
        part: "snippet",
        key: apiKey,
        q:  term

      },
    dataType: 'json',
    type: "get",
    success: callback

  };
  $.ajax(query);
}

getCoinDataFromApi(formatCryptoCoinData);
getMarketCapData(displayMarketCapData);
getYoutubeData(formatYoutubeData, "crypto");

function displayMarketCapData(data){
  var formattedData = data;
  var value = formattedData.toLocaleString({
  });

    $(".marketCapData").append(
      `<div class = "marketCapContent">
      <h3 class ="marketCapTxt">$${data.total_market_cap_usd.toLocaleString()}</h3> <p>Current Market Cap</p>
      </div>`
  );
}


function formatCryptoCoinData(data){

   const formattedData = data.map(crypto =>{
     return {
       name: crypto.name,
       usdPrice: crypto.price_usd,
       oneHour: crypto.percent_change_1h,
       oneDay: crypto.percent_change_24h,
       symbol: crypto.symbol

     }
   })
   displayCryptoData(formattedData);
  }


function filterCoinData(term){
  const filterd = allCoinData.filter(coin => {
     if (coin.name.toLowerCase() == term.toLowerCase()){
       return coin.name;
     }
     if  (coin.symbol.toLowerCase() == term.toLowerCase()){
       return coin.symbol;
     }
  });
  formatCryptoCoinData(filterd);



}

function displayCryptoData(formattedData){
  $(".data").empty();
  for (let i = 0; i < formattedData.length; i++){
    let crypto = formattedData[i];
    console.log(crypto);
      $(".data").append(`
         <div class ="${(+crypto.oneDay < 0)? "cryptoCards red" : "cryptoCards green"}">
           <h2 class ="cryptoName">${crypto.name}</h2>
           <h4 class ="cryptosymbol">${crypto.symbol}</h4> <p>Current price is $ <strong>${crypto.usdPrice}</strong>
           <br>${crypto.name}'s 24 hour change is <strong>${crypto.oneDay}%</strong></p>`
         );

  }
}



function formatYoutubeData(data) {
  $(".youtubeData").empty();
  for (let i = 0; i < data.items.length; i++){

    $(".youtubeData").append( `
          <div class ="video">
                <a href= "https://www.youtube.com/watch?v=${data.items[i].id.videoId}"target="_blank">${data.items[i].snippet.title} </a><br>
                <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}}"target="_blank"><img class = "videoImg" src="${data.items[i].snippet.thumbnails.medium.url}"></a><br>
              </div>`);
  }
}





function displayYoutubeData(youtubeFiltered) {

  for(let i = 0; i < youtubeFiltered.length; i++){
  let videoInfo = formatYoutubeData[i]

$(".youtubeData").append( `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${data.id.videoId}" target="_blank">${data.snippet.title}</a>
      </h2>
      <a href="https://www.youtube.com/watch?v=${data.id.videoId}" target="_blank"><img src="${data.snippet.thumbnails.default.url}"></a>
    </div>
  `);
  }
}


function togglePostiveChange() {
  const filtered = allCoinData.filter(coin => {
    return +coin.percent_change_24h > 0;

  }).sort((coin1, coin2) => {
    return coin2.percent_change_24h - coin1.percent_change_24h
  });
  formatCryptoCoinData(filtered);
}
function toggleNegitiveChange(){
  const filtered = allCoinData.filter(coin => {
    return +coin.percent_change_24h < 0;

  }).sort((coin1, coin2) => {
    return coin1.percent_change_24h - coin2.percent_change_24h
  });
  formatCryptoCoinData(filtered);
}



$(function () {
  $(".js-search-form").submit(event => {

    event.preventDefault();
    const userSearch = $(".jsSearch").val();
    if (userSearch){
      filterCoinData(userSearch);
      getYoutubeData(formatYoutubeData, userSearch)
      $(".jsSearch").val("");
    }
    else {
      $(".mainDisplay").empty();
      $(".mainDisplay").append(`
                <h2>Search Some Crypto</h2>
        <img class ="dogePic"src = "https://res.cloudinary.com/dx5z7wjpw/image/upload/v1522032061/dogecoin-logo.jpg">
        </div>`);

    }
  });
  $(".filterDropdown").change(event => {
    console.log($(event.target).val());
    let userChoice = $(event.target).val();
    if (userChoice == "gainers"){
      togglePostiveChange();
    }
    else if (userChoice == "losers"){
      toggleNegitiveChange();
    }

    else {
      formatCryptoCoinData(allCoinData);
      getYoutubeData(formatYoutubeData, "crypto")
    }
  });
  $(".clearButton").click(event =>{
    event.preventDefault();
    $(".showChange").prop('checked', false);
    formatCryptoCoinData(allCoinData);
    getYoutubeData(formatYoutubeData, "crypto")
  });
});
