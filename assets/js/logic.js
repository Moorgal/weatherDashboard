// get data
// search data
// display data
// save last searches to localStorage

const formHeading = document.querySelector('#form-heading');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const theHistory = document.querySelector('#history');
const today = document.querySelector('#today');
const forecast = document.querySelector('#forecast');
const ApiKey = '3ac8e7e0b94efb1de4e85813ee49a8f8';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=' + ApiKey;

$.ajax({
  url: ApiUrl,
  method: 'GET',
}).then(function (response) {
  console.log(response);
});
