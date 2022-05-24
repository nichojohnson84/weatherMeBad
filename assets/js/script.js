// OpenWeatherMap API. Do not share it publicly.  Trust me I know
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
        response.json().then(function (data) {
          displayCityWeather(data, city);
        });
      } else {
        alert('Oh no!:' + response.statusText);
      }
    })
    //Error?
    .catch(function (error) {
      alert("Sorry, can't connect to Open Weather!");
    });
};

//UV index time
var searchUV = function (lon, lat, city) {
  var uvLink =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    key +
    '&lat=' +
    lat +
    '&lon=' +
    lon;

  fetch(uvLink)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (lon, lat, city) {
          displayCurrentUV(lon, lat, city);
        });
      } else {
        alert('Oh no!:' + response.statusText);
      }
    })

    //connection error?
    .catch(function (error) {
      alert("Sorry, can't connect to Open Weather!");
    });
};

//Lets See that weather
var displayCityWeather = function (city, citySearchTerm) {
  //out with the old
  cityContainerEl.textContent = '';
  citySearchTerm.textContent = searchTerm;

  var displayCurrentDate = document.querySelector('#city-current-date');
  var currentDate = moment();
  displayCurrentDate.textContent = currentDate.format('()');

  //icon for weather
  var displayIcon = document.querySelector('#city-current-icon');
  var currentIcon =
    'https://openweathermap.org/img/wn/' + city.weather[0].icon + '@2x.png';
  displayIcon.setAttribute('src', currentIcon);

  //Gimme the temp
  var displayTemp = document.querySelector('#temp-input');
  var currentTemp = Math.round(city.main.temp) + '°F';
  displayTemp.textContent = currentTemp;

  //humiditize
  var displayHumidity = document.querySelector('#humidity-input');
  var currentHumidity = city.main.humidity + '%';
  displayHumidity.textContent = currentHumidity;

  //Windy?
  var displayWind = document.querySelector('#humidity-input');
  var currentWind = city.wind.speed + 'MPH';
  displayWind.textContent = currentWind;
};
