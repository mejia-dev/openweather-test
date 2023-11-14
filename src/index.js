import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(input) {
  let request = new XMLHttpRequest();
  let url;
  if (input.match(/[0-9]{5}/g)) {
    url = `http://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=${process.env.API_KEY}`;
  } else {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.API_KEY}`;
  }

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, input);
    } else {
      printError(this, input);
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

function handleCityFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

function handleZIPFormSubmission(event) {
  event.preventDefault();
  const zip = document.querySelector('#zip').value;
  document.querySelector('#zip').value = null;
  getWeather(zip);
}

window.addEventListener("load", function() {
  document.getElementById('cityForm').addEventListener("submit", handleCityFormSubmission);
  document.getElementById('ZIPForm').addEventListener("submit", handleZIPFormSubmission);
});