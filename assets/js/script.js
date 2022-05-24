// OpenWeatherMap API. Do not share it publicly.  Trust me I know
var apiKey = 'adcdd39a27408e63496466f128199b0d';

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
  var apiURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=imperial&appid=' +
    apiKey;

  //Success?  line 50 had an error so keep an ey on it.
  fetch(apiURL)
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
  var uvURL =
    'https://api.openweathermap.org/data/2.5/uvi?q=' +
    city +
    '&appid=' +
    apiKey +
    '&lat=' +
    lat +
    '&lon=' +
    lon;

  fetch(uvURL)
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
  citySearchTerm.textContent = citySearchTerm;

  var displayCurrentDate = document.querySelector('#city-current-date');
  var currentDate = moment();
  displayCurrentDate.textContent = currentDate.format('(L)');

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
  var displayWind = document.querySelector('#wind-input');
  var currentWind = city.wind.speed + 'MPH';
  displayWind.textContent = currentWind;

  //city list
  var newCityEl = document.createElement('li');
  newCityEl.className = 'list-group-item';
  newCityEl.textContent = citySearchTerm;
  newCityEl.addEventListener('click', clickHandler);
  previousCityEl.appendChild(newCityEl);

  //dangerous uv rays index
  var lon = city.coord.lon;
  var lat = city.coord.lat;

  searchUV(lon, lat, city);
};

//show me the UV
var displayCurrentUV = function (data) {
  var uv = data.value;
  if (uv >= 6) {
    currentUvEl.classList = 'badge badge-danger';
    currentUvEl.innerHTML = '' + uv + '';
  } else if (uv > 3) {
    currentUvEl.classList = 'badge badge-warning';
    currentUvEl.innerHTML = '' + '';
  } else {
    currentUvEl.classList = 'badge badge-success';
    currentUvEl.innerHTML = '' + uv + '';
  }
};

//5 day forecast time
var getForecast = function (city) {
  var forecastLink =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city +
    '&units=imperial&cnt=6&appid=' +
    apiKey;

  //success?
  fetch(forecastLink)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data.list);
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

//need for loop for forcast
var displayForecast = function (list) {
  console.log(list);

  for (var i = 0; i <= 4; i++) {
    //Show me the forecast please
    var displayDate1 = document.querySelector('#date-0');
    var forecastDate1 = moment().add(1, 'days').format('L');
    displayDate1.textContent = forecastDate1;

    var displayDate2 = document.querySelector('#date-1');
    var forecastDate2 = moment().add(2, 'days').format('L');
    displayDate2.textContent = forecastDate2;

    var displayDate3 = document.querySelector('#date-2');
    var forecastDate3 = moment().add(3, 'days').format('L');
    displayDate3.textContent = forecastDate3;

    var displayDate4 = document.querySelector('#date-3');
    var forecastDate4 = moment().add(4, 'days').format('L');
    displayDate4.textContent = forecastDate4;

    var displayDate5 = document.querySelector('#date-4');
    var forecastDate5 = moment().add(5, 'days').format('L');
    displayDate5.textContent = forecastDate5;

    //need temp
    var displayTemp1 = document.querySelector('#temp-0');
    var forcastTemp1 = list[i].main.temp + ' °F';
    displayTemp1.textContent = forcastTemp1;
    console.log(forcastTemp1);

    var displayTemp2 = document.querySelector('#temp-1');
    var forcastTemp2 = list[i].main.temp + ' °F';
    displayTemp2.textContent = forcastTemp2;

    var displayTemp3 = document.querySelector('#temp-2');
    var forcastTemp3 = list[i].main.temp + ' °F';
    displayTemp3.textContent = forcastTemp3;

    var displayTemp4 = document.querySelector('#temp-3');
    var forcastTemp4 = list[i].main.temp + ' °F';
    displayTemp4.textContent = forcastTemp4;

    var displayTemp5 = document.querySelector('#temp-4');
    var forcastTemp5 = list[i].main.temp + ' °F';
    displayTemp5.textContent = forcastTemp5;

    //need humidity - trying same process with humidity
    var displayHumidity = document.querySelector('#humidity-0');
    var forecastHumidity = list[i].main.humidity + '%';
    displayHumidity.textContent = forecastHumidity;

    var displayHumidity = document.querySelector('#humidity-1');
    var forecastHumidity = list[i].main.humidity + '%';
    displayHumidity.textContent = forecastHumidity;

    var displayHumidity = document.querySelector('#humidity-2');
    var forecastHumidity = list[i].main.humidity + '%';
    displayHumidity.textContent = forecastHumidity;

    var displayHumidity = document.querySelector('#humidity-3');
    var forecastHumidity = list[i].main.humidity + '%';
    displayHumidity.textContent = forecastHumidity;

    var displayHumidity = document.querySelector('#humidity-4');
    var forecastHumidity = list[i].main.humidity + '%';
    displayHumidity.textContent = forecastHumidity;

    //need weather icons
    var displayIcon1 = document.querySelector('#city-icon-1');
    var currentIcon1 =
      'https://openweathermap.org/img/wn/' +
      list[1].weather[0].icon +
      '@2x.png';
    displayIcon1.setAttribute('src', currentIcon1);

    var displayIcon2 = document.querySelector('#city-icon-2');
    var currentIcon2 =
      'https://openweathermap.org/img/wn/' +
      list[2].weather[0].icon +
      '@2x.png';
    displayIcon2.setAttribute('src', currentIcon2);

    var displayIcon3 = document.querySelector('#city-icon-3');
    var currentIcon3 =
      'https://openweathermap.org/img/wn/' +
      list[3].weather[0].icon +
      '@2x.png';
    displayIcon3.setAttribute('src', currentIcon3);

    var displayIcon4 = document.querySelector('#city-icon-4');
    var currentIcon4 =
      'https://openweathermap.org/img/wn/' +
      list[4].weather[0].icon +
      '@2x.png';
    displayIcon4.setAttribute('src', currentIcon4);

    var displayIcon5 = document.querySelector('#city-icon-5');
    var currentIcon5 =
      'https://openweathermap.org/img/wn/' +
      list[5].weather[0].icon +
      '@2x.png';
    displayIcon5.setAttribute('src', currentIcon5);
  }
};

//display results
userFormEl.addEventListener('submit', formSubmitHandler);
