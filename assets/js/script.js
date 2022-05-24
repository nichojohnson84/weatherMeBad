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
