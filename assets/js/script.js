// OpenWeatherMap API. Do not share it publicly.
const api = 'adcdd39a27408e63496466f128199b0d';

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
    });
  }
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    // Storing Longitude and Latitude in variables
    long = position.coords.longitude;
    lat = position.coords.latitude;
    const base = `https://api.openweathermap.org/data/2.5/weatherlat=${lat}&lon=${long}&appid=${api}&units=metric`;
    console.log(base);
    fetch(base)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { temp } = data.main;
        const place = data.name;
        const { description, icon } = data.weather[0];
        const { sunrise, sunset } = data.sys;
      });
  });
}
