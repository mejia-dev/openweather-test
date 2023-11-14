import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${Math.trunc(apiResponse.main.temp * 9/5 - 459.67)} degrees.`;
}

function printError(request, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});