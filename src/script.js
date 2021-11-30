function changeHour() {
  let currentDate = new Date();
  let time = document.querySelector("h3");
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${hour}:${minutes}`;
}

function getOrdinal() {
  let currentDate = new Date();
  let dayDate = currentDate.getDate();
  if (dayDate === 1) {
    return "st";
  } else if (dayDate === 2 || dayDate === 22) {
    return "nd";
  } else if (dayDate === 3) {
    return "rd";
  } else {
    return "th";
  }
}

function changeDate() {
  let currentDate = new Date();
  let date = document.querySelector("#date");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  let dayDate = currentDate.getDate();
  let ordinal = getOrdinal();
  let day1 = document.querySelector("#day-1");
  let day2 = document.querySelector("#day-2");
  let day3 = document.querySelector("#day-3");
  let day4 = document.querySelector("#day-4");
  let day5 = document.querySelector("#day-5");
  day1.innerHTML = days[currentDate.getDay() + 1];
  day2.innerHTML = days[currentDate.getDay() + 2];
  day3.innerHTML = days[currentDate.getDay() + 3];
  day4.innerHTML = days[currentDate.getDay() + 4];
  day5.innerHTML = days[currentDate.getDay() + 5];
  date.innerHTML = `${day} ${dayDate}${ordinal} </br>of ${month}`;
  changeHour();
}

function changeCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  let city = document.querySelector("h1");
  let maxTemp = document.querySelector("#max");
  let minTemp = document.querySelector("#min");
  city.innerHTML = response.data.name;
  displayTemp.innerHTML = temperature;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
}

function requestCity(event) {
  event.preventDefault();
  let apiKey = "055ee8048e7236318bbd1ee44ad667e0";
  let newCity = document.querySelector("#new-city");
  let citySearch = newCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCity);
}

function currentCity(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "055ee8048e7236318bbd1ee44ad667e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCity);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(currentCity);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", requestCity);

changeDate();
let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", getCurrentCity);

//function convertToFarenheit() {
//  let farenheit = document.querySelector("#farenheit-button");
//  farenheit.classList.remove("btn-secondary");
//  let celsius = document.querySelector("#celsius-button");
//  celsius.classList.add("btn-secondary");
//  let docTemperature = document.querySelector("#temperature");
//  let temperature = parseInt(docTemperature.innerText, 10);
//  let farenheitTemperature = (temperature * 9) / 5 + 32;
//  docTemperature.innerHTML = farenheitTemperature;
//}
//
//let farenheit = document.querySelector("#farenheit-button");
//farenheit.addEventListener("click", convertToFarenheit);
//
//function convertToCelsius() {
//  let celsius = document.querySelector("#farenheit-button");
//  celsius.classList.add("btn-secondary");
//  let farenheit = document.querySelector("#celsius-button");
//  farenheit.classList.remove("btn-secondary");
//  let docTemperature = document.querySelector("#temperature");
//  let temperature = parseInt(docTemperature.innerText, 10);
//  let celsiusTemperature = Math.ceil(((temperature - 32) * 5) / 9);
//  docTemperature.innerHTML = celsiusTemperature;
//}
//
//let celsius = document.querySelector("#celsius-button");
//celsius.addEventListener("click", convertToCelsius);
