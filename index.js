// API_Key: cc156b0b76224bcb9a7100107232608

let searchBar = document.querySelector(".search-bar");
let date = new Date();


//fetch Date from API
async function searchCity(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cc156b0b76224bcb9a7100107232608&q=${city}&days=3`);
  let data = await response.json();
  return data
}


function displayTodayWeather(data) {

  let thisDayDate= new Date() ;

  const todayDate = `

<div class="d-flex justify-content-between">
  <p>${thisDayDate.toLocaleDateString("en-us", {weekday:"long"})}</p>
  <p>${thisDayDate.getDate() +" "+ thisDayDate.toLocaleDateString("en-us",{month:"long"})}</p>
</div>
<div>
  <p>${data.location.name}</p>
  <div class="d-flex justify-content-around align-items-center">
    <h3 class="temperature">${data.current.temp_c}°C</h3>
     <img src="https:/${data.current.condition.icon}" />
   </div>
  <p>${data.current.condition.text}</p>
  <div class="mt-5">
    <span class="me-2"
      ><i class="fa-solid fa-umbrella fa-lg me-1"></i>${data.current.humidity}%</span
    >
    <span class="me-2"
      ><i class="fa-solid fa-wind fa-lg me-1"></i>${data.current.wind_kph}km/h</span
    >
    <span class="me-2"
      ><i class="fa-regular fa-compass fa-lg me-1"></i>${data.current.wind_dir}</span
    >
  </div>
</div>
`
  document.querySelector(".present-day").innerHTML = todayDate;

}


function displayTomorrowWeather(data) {
  let thisDayDate= new Date(data.forecast.forecastday[1].date)
  const tomorrowWeatherData = `
<h3 class="text-center">${thisDayDate.toLocaleDateString("en-us", {weekday:"long"})}</h3>
<div class="card-body">
  <div
    class="h-100 d-flex flex-column justify-content-center align-items-center"
  >
    <img src=https:${data.forecast.forecastday[1].day.condition.icon} />
    <p class="fs-2">${data.forecast.forecastday[1].day.avgtemp_c}°C</p>
    <p>${data.forecast.forecastday[1].day.mintemp_c}°C</p>
    <p>${data.forecast.forecastday[1].day.condition.text}</p>
  </div>
</div>`
  document.querySelector(".next-day").innerHTML = tomorrowWeatherData
}


function displayAfterTomorrowWeather(data) {
  let thisDayDate= new Date(data.forecast.forecastday[2].date)
  const afterTomorrowWeather = `
<h3 class="text-center">${thisDayDate.toLocaleDateString("en-us", {weekday:"long"})}</h3>
<div class="card-body">
  <div
    class="h-100 py-5 d-flex flex-column justify-content-center align-items-center"
  >
  <img src=https:${data.forecast.forecastday[2].day.condition.icon} />
    <p class="fs-2">${data.forecast.forecastday[2].day.avgtemp_c}°C</p>
    <p>${data.forecast.forecastday[2].day.mintemp_c}°C</p>
    <p>${data.forecast.forecastday[2].day.condition.text}</p>
  </div>
</div>
`
  document.querySelector(".after-next-day").innerHTML = afterTomorrowWeather
}



async function runApp(city = "Damascus") {
  let weatherData = await searchCity(city)
  displayTodayWeather(weatherData);
  displayTomorrowWeather(weatherData)
  displayAfterTomorrowWeather(weatherData)
}
runApp()


let buttonOfSearch = document.querySelector(".find-button")

buttonOfSearch.addEventListener("click", function (event) {
  runApp(searchBar.value);
  event.preventDefault();
})
