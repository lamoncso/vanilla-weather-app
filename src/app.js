function formatDate(timestamp){
let date = new Date(timestamp);
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

}

function displayTemperature(response) {
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
  formatDate(response.data.dt * 1000);
  let changeIcon = document
    .querySelector("#icon");
console.log(response.data);
    changeIcon.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    changeIcon.setAttribute("alt", `${response.data.weather[0].description}`);
}

function search(city) {
let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let apiUrl = `${apiEndpoint}&q=${city}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
 search(cityInputElement.value);
}

search("Budapest");


let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);
