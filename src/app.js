let today = document.querySelector("#today");
let currentTime = document.querySelector("#current-time");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
today.innerHTML = `${day}`;

let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hour}:${minutes}`;

function displayTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let city = "Eidenberg";
let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let apiUrl = `${apiEndpoint}&q=${city}&units=${units}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
