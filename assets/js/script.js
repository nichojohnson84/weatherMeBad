// OpenWeatherMap API. Do not share it publicly.
var key = 'adcdd39a27408e63496466f128199b0d';

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var cityContainerEl = document.querySelector('#city-container');
var citySearchTerm = document.querySelector('#city-search-term');
var currentWeather = document.querySelector('#current-weather');
var previousCityEl = document.getElementById('search-container');
var fiveDayEl = document.querySelector('#forecast-cards');
var currentUvEl = document.querySelector('#uv-input');

var cityArray = [];

// search city form submission
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getCityWeather(city);
    getForecast(city);

    cityArray.push(city);
    localStorage.setItem('city', JSON.stringify(cityArray));

    cityInputEl.value = '';
  } else {
    alert('Enter your city in the search');
  }
};

//click on a past city (history)
var clickHandler = function (event) {
  var clickCity = event.currentTarget.pastCity;

  getCityWeather(clickCity);
  getForecast(clickCity);
};

//request the weather
var getCityWeather = function (city) {
  var apiLink =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=imperial&appid=' +
    key;

  //Success?  line 50 had an error so keep an ey on it.
  fetch(apiLink)
    .then(function (response) {
      if (response.ok) {
        response.json.then(fuction(data)(displayCityWeather(data, city)));
      } else {
        alert('Oh no!:' + response.statusText);
      }
    })
    //Error?
    .catch(function (error) {
      alert("Sorry, can't connect to your weather!");
    });
};
