// get data
// search data
// display data
// save last searches to localStorage

//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
//   * When a user views the current weather conditions for that city they are presented with:
//     * The city name
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//     * The wind speed
//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// same
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city

const formHeading = document.querySelector('#form-heading');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const theHistory = document.querySelector('#history');
const today = document.querySelector('#today');
const forecast = document.querySelector('#forecast');
const ApiKey = '3ac8e7e0b94efb1de4e85813ee49a8f8';

function submit() {
  localStorage.setItem(new Date().toLocaleString(), searchInput.value.trim());
}

let localStorageArray = [];
for (let i = 0; i < localStorage.length; ++i) {
  localStorageArray.push(localStorage.key(i));
}
let allArray = localStorageArray.sort();
let sortedArray = allArray.splice(-5);
let townName;
if (sortedArray.length === 0) {
  townName = 'London';
} else {
  townName = localStorage.getItem(sortedArray[sortedArray.length - 1]);
}
function renderHistory() {
  for (let i = sortedArray.length - 1; i >= 0; i--) {
    console.log(localStorage.getItem(sortedArray[i]));
    let h2 = document.createElement('button');
    h2.classList.add('btn');
    let h2text = document.createTextNode(localStorage.getItem(sortedArray[i]));
    h2.appendChild(h2text);
    theHistory.appendChild(h2);
  }
}

renderHistory();

$.ajax({
  url: `http://api.openweathermap.org/geo/1.0/direct?q=${townName}&limit=1&appid=${ApiKey}`,
  method: 'GET',
}).then(function (response) {
  let townNameLat = response[0].lat;
  let townNameLon = response[0].lon;

  $.ajax({
    // url: `https://api.openweathermap.org/data/2.5/weather?lat=${townNameLat}&lon=${townNameLon}&cnt=5&appid=${ApiKey}&units=metric`,
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${townNameLat}&lon=${townNameLon}&appid=${ApiKey}&units=metric`,
    method: 'GET',
  }).then(function (response2) {
    let currentDate = new Date().toLocaleDateString();
    let urlIcon = `http://openweathermap.org/img/w/${response2.weather[0].icon}.png`;
    today.innerHTML = `<h1 style="display:inline;">${townName}(${currentDate})<img style="display:'inline-block'" src="${urlIcon}" ></h1>
                        <p>Temperature : ${response2.main.temp}</p>
                        <p>Wind Speed: ${response2.wind.speed}</p>
                        <p>Humidity: ${response2.main.humidity}</p>`;
  });
});

searchButton.addEventListener('click', submit);
