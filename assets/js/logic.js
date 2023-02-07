const formHeading = document.querySelector('#form-heading');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const theHistory = document.querySelector('#history');
const today = document.querySelector('#today');
const forecast = document.querySelector('#forecast');
const ApiKey = '3ac8e7e0b94efb1de4e85813ee49a8f8';
// ------------------------
// ----search-----------
// ----------------------
function submit() {
  localStorage.setItem(new Date().toLocaleString(), searchInput.value.trim());
}
searchButton.addEventListener('click', submit);
// ----set up localstorage-----------
let localStorageArray = [];
for (let i = 0; i < localStorage.length; ++i) {
  localStorageArray.push(localStorage.key(i));
}
let allArray = localStorageArray.sort();
let sortedArray = allArray.splice(-6);
let townName;
if (sortedArray.length === 0) {
  townName = 'London';
} else {
  townName = localStorage.getItem(sortedArray[sortedArray.length - 1]);
}
// ------------------------
// ----history----------
// ----------------------
for (let i = sortedArray.length - 1; i >= 0; i--) {
  console.log(localStorage.getItem(sortedArray[i]));
  let historyButton = document.createElement('button');
  historyButton.classList.add('btn');
  historyButton.classList.add('historyBtn');
  let historyButtontext = document.createTextNode(localStorage.getItem(sortedArray[i]));
  historyButton.appendChild(historyButtontext);
  theHistory.appendChild(historyButton);
}
// ----make history buttons active-----------
let historyBtns = document.querySelectorAll('.historyBtn');
console.log(historyBtns);
historyBtns.forEach(function (oneBtn) {
  oneBtn.addEventListener('click', function () {
    localStorage.setItem(new Date().toLocaleString(), oneBtn.innerHTML);
    location.reload();
  });
});

// ------------------------
// ----weather today-----------
// ----------------------

// ----get geodata-----------

$.ajax({
  url: `https://api.openweathermap.org/geo/1.0/direct?q=${townName}&limit=1&appid=${ApiKey}`,
  method: 'GET',
}).then(function (response) {
  let townNameLat = response[0].lat;
  let townNameLon = response[0].lon;
  // ----get weather-----------

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${townNameLat}&lon=${townNameLon}&appid=${ApiKey}&units=metric`,
    method: 'GET',
  }).then(function (response2) {
    let currentDate = new Date().toLocaleDateString();
    let urlIcon = `https://openweathermap.org/img/w/${response2.weather[0].icon}.png`;
    today.innerHTML = `<h1 style="display:inline;">${townName}(${currentDate})<img style="display:'inline-block'" src="${urlIcon}" ></h1>
                        <p>Temperature : ${response2.main.temp}</p>
                        <p>Wind Speed: ${response2.wind.speed}</p>
                        <p>Humidity: ${response2.main.humidity}</p>`;
  });
  // ------------------------
  // ----forecast-----------
  // ----------------------
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${townNameLat}&lon=${townNameLon}&cnt=50&appid=${ApiKey}&units=metric`,
    // url: `https://api.openweathermap.org/data/2.5/forecast/daily?id=London&cnt=5&appid=${ApiKey}`,
    method: 'GET',
  }).then(function (response3) {
    console.log(response3);
    for (let i = 0; i <= 40; i = i + 8) {
      let forecastDiv = document.createElement('div');
      let h2 = document.createElement('h4');
      let h2text = document.createTextNode(new Date(response3.list[i].dt_txt).toLocaleDateString());
      let urlIcon = `https://openweathermap.org/img/w/${response3.list[i].weather[0].icon}.png`;
      let imgIcon = document.createElement('img');
      imgIcon.setAttribute('src', urlIcon);
      let p1 = document.createElement('p');
      let p1text = document.createTextNode(`Temp:${response3.list[i].main.temp}`);
      let p2 = document.createElement('p');
      let p2text = document.createTextNode(`Wind:${response3.list[i].wind.speed}`);
      let p3 = document.createElement('p');
      let p3text = document.createTextNode(`Humidity:${response3.list[i].main.humidity}`);
      h2.appendChild(h2text);
      p1.appendChild(p1text);
      p2.appendChild(p2text);
      p3.appendChild(p3text);
      forecastDiv.appendChild(h2);
      forecastDiv.appendChild(imgIcon);
      forecastDiv.appendChild(p1);
      forecastDiv.appendChild(p2);
      forecastDiv.appendChild(p3);

      forecast.appendChild(forecastDiv);
    }
  });
});
