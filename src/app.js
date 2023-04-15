function formatDate() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  document.querySelector("#current-time").innerHTML = `${hour}:${minutes}`;
  document.querySelector("#today").innerHTML = `${day}`;
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri","Sat"]

return days[day];
}

function displayForecast(response) {
  console.log(response.data);

  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#weatherForecast");
  
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
   
  forecastHTML =
    forecastHTML +
    `
  <div class="col">
              <div class="weatherForecastPreview">
                <div class="forecast-time">${formatDay(forecastDay.time)}</div>
               <img 
               src= "${forecastDay.condition.icon_url}"
               width="50" 
               class="icon-img">
                  <span class="forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                  <span class="forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
                </div>
              </div> `;
    }
  })
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}


function displayTemperature(response) {
  let date = new Date();
  let day = date.getDay();

  let cityElement = document.querySelector("#city");
  let weatherDiscription = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");

  celsiusTemperature = Math.round(response.data.daily[day].temperature.day);
  celsiusElement.classList.add("active");

  cityElement.innerHTML = response.data.city;
  weatherDiscription.innerHTML = response.data.daily[day].condition.description;
  temperatureElement.innerHTML = celsiusTemperature;
  currentHumidity.innerHTML = Math.round(
    response.data.daily[day].temperature.humidity
  );
  currentWindSpeed.innerHTML = Math.round(response.data.daily[day].wind.speed);

  formatDate();

  let changeIcon = document.querySelector("#icon");
  let iconElement = response.data.daily[day].condition.icon_url;
  changeIcon.setAttribute(
    "src",
    `${iconElement}`
  );
  changeIcon.setAttribute("alt", `${response.data.daily[day].condition.icon}`);

}

function search(city) {
  let apiKey = "38b4007bb2o759fac3256t2dfdb47a50";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

function showCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");

  let fahrenheitValue = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitValue);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", showFahrenheit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", showCelsius);

search("Budapest");
