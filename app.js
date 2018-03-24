const coinUrl ="https://api.coinmarketcap.com/v1/ticker/?limit=10" // top 10 coins on coinMarketCap
const marketCapUrl ="https://api.coinmarketcap.com/v1/global/" // gobal marketcap
const apiKey = "AIzaSyDi8P6Mcr_qrUcgI8tQBrR-4B-3IY_ewZc"
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

let allCoinData = [];
let youtubeDataHolder =[];


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

function getYoutubeData(callback, term) {

  const query = {
    url: youtubeURL,
      data: {
        maxResults: "5",
        part: "snippet",
        key: apiKey,
        q:  youtubeSearch(term)

      },
    dataType: 'json',
    type: "get",
    success: callback

  };
  $.ajax(query);
}

getCoinDataFromApi(formatCryptoCoinData);
getMarketCapData(displayMarketCapData);
getYoutubeData(formatYoutubeData);

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
// console.log(youtubeDataHolder);
// console.log(allCoinData);


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

function youtubeSearch(term){

  if (!term){
    return "crypto";
  }
        // return term;
     console.log(term);


  // getYoutubeData();
}

function formatYoutubeData(data) {
  // console.log(term);
  for (let i = 0; i < data.items.length; i++){

    $(".youtubeData").append( `
                <a href= "https://www.youtube.com/watch?v=${data.items[i].id.videoId}"target="_blank">${data.items[i].snippet.title} </a><br>
                <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}}"target="_blank"><img src="${data.items[i].snippet.thumbnails.medium.url}"></a><br>
              `);
  }
}


function displayCryptoData(formattedData){
  $(".data").empty();
  for (let i = 0; i < formattedData.length; i++){
    let crypto = formattedData[i];
      $(".data").append(`
         <div class ="cryptoCards">
           <h2 class ="cryptoName">${crypto.name}</h2> Current price is $ ${crypto.usdPrice}
           <br>${crypto.name}'s 1 hour change is ${crypto.oneHour}%`
         );

  }
}

function displayMarketCapData(data){
  var formattedData = data;
  var value = formattedData.toLocaleString({
  });
    $(".marketCapData").append(
      `<h3>${data.total_market_cap_usd.toLocaleString()}</h3> Current Market Cap`
  );
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


function toggleChange() {
  const filtered = allCoinData.filter(coin => {
    return +coin.percent_change_24h > 0;
  });
  formatCryptoCoinData(filtered);
}

$(function () {
  $(".js-search-form").submit(event => {

    event.preventDefault();
    const userSearch = $(".jsSearch").val();
    filterCoinData(userSearch);
    getYoutubeData(userSearch)
    $(".jsSearch").val("");
  });
  $(".showChange").change(event => {
    console.log("checked");
    if ($(".showChange").is(":checked")){

      toggleChange();
    }
    else {
      formatCryptoCoinData(allCoinData);
    }
  });
  $(".clearButton").click(event =>{
    event.preventDefault();
    $(".showChange").prop('checked', false);
    formatCryptoCoinData(allCoinData);
  });
});
