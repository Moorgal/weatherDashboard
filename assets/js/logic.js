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
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city

const formHeading = document.querySelector('#form-heading');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const theHistory = document.querySelector('#history');
const today = document.querySelector('#today');
const forecast = document.querySelector('#forecast');
const ApiKey = '3ac8e7e0b94efb1de4e85813ee49a8f8';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=' + ApiKey;

// api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
let townName = 'London';
http: $.ajax({
  url: `http://api.openweathermap.org/geo/1.0/direct?q=${townName}&limit=1&appid=${ApiKey}`,
  method: 'GET',
}).then(function (response) {
  console.log(response);
  console.log(response[0].name);
});
