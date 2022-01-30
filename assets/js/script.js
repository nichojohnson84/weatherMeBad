//addeventlistener for search button bring weather for city entered in the text box
var button = document.getElementById ("btn")
button.addEventListener ('click', getWeather)

var cityResponse;
var tempResponse;
var humidityResponse;
var uvIndexResponse;

function getWeather (event) {
    event.preventDefault ()
    var localSearch = event.target.previousSibling.previousSibling.value
    var geoSearch = "http://api.openweathermap.org/geo/1.0/direct?q="+localSearch+"&appid=48454c83470277fd99afd700c55b471f"
    fetch (geoSearch)
    .then (function (data){
        return data.json ()
    })
    .then (function (response){
        var lat = response[0].lat
        var lon = response[0].lon
        var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=48454c83470277fd99afd700c55b471f"
        cityResponse = response
        console.log (response)
        fetch (oneCall)
        .then (function (data){
            return data.json ()
        })
        .then (function (response){
        console.log (response)
        displayCurrentWeather (response,cityResponse)
        })
        .then (function (response){
            console.log (response)
            displayCurrentTemp (response,tempResponse)
        })
    })
}
function displayCurrentWeather (weather,currentCity) {
    console.log (weather)
   
    var city = document.getElementById ("city")
    var temp = document.getElementById ("temp")
    var humidity = document.getElementById ("humidity")
    var uvIndex = document.getElementById ("uvIndex")
    city.textContent = currentCity[0].name
    temp.value = currentTemp[0].value
    
}
















//