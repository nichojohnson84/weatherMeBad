// //addeventlistener for search button bring weather for city entered in the text box
// var button = document.getElementById('btn');
// var cityResponse;
// var tempResponse;
// var humidityResponse;
// var uvIndexResponse;

// button.addEventListener('click', getWeather);
// function getWeather(event) {
//   event.preventDefault();
//   var localSearch = event.target.previousSibling.previousSibling.value;
//   var geoSearch =
//     'http://api.openweathermap.org/geo/1.0/direct?q=' +
//     localSearch +
//     '&appid=adcdd39a27408e63496466f128199b0d';
//   fetch(geoSearch)
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (response) {
//       var lat = response[0].lat;
//       var lon = response[0].lon;
//       var oneCall =
//         'https://api.openweathermap.org/data/2.5/onecall?lat=' +
//         lat +
//         '&lon=' +
//         lon +
//         '&units=imperial&appid=adcdd39a27408e63496466f128199b0d';
//       cityResponse = response;
//       console.log(response);

//       fetch(oneCall)
//         .then(function (data) {
//           return data.json();
//         })
//         .then(function (response) {
//           console.log(response);
//           displayCurrentWeather(response, cityResponse);
//         })
//         .then(function (response) {
//           console.log(response);
//           displayCurrentTemp(response, tempResponse);
//         });
//     });
// }
// function displayCurrentWeather(weather, currentCity) {
//   console.log(weather);

//   var city = document.getElementById('city');
//   var temp = document.getElementById('temp');
//   var humidity = document.getElementById('humidity');
//   var uvIndex = document.getElementById('uvIndex');
//   city.textContent = currentCity[0].name;
//   temp.value = currentTemp[0].value;
// }
// /*snow = <p>Unicode:</p>
// <i style='font-size:24px' class='fas'>&#xf2dc;</i>
//  SUN = <p>Unicode:</p>
// <i style='font-size:24px' class='far'>&#xf185;</i>
// or far fa-sun
// MIXED WEATHER=<p>Used on a button:</p>
// <button style='font-size:24px'>Button <i class='fas fa-cloud-sun-rain'></i></button>
// or fas fa-cloud-sun-rain
// WINDY=<p>Unicode:</p>
// <i style='font-size:24px' class='fas'>&#xf72e;</i>
// or fas fa-wind
// LIGHTNING= <p>Unicode:</p>
// <i style='font-size:24px' class='fas'>&#xf0e7;</i>
// or far fa-sun
// Rain=<p>Unicode:</p>
// <i style='font-size:24px' class='fas'>&#xf73d;</i>
// or fas fa-cloud-rain*/
// OpenWeatherMap API. Do not share it publicly.
const api = 'adcdd39a27408e63496466f128199b0d';

window.addEventListener('load', () => {
  let long;
  let lat;
  //getting the location of the user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
    });
  }
});
