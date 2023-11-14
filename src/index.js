import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(input) {
  let request = new XMLHttpRequest();
  let url;
  if (input.match(/[0-9]{5}/g)) {
    url = `http://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=${process.env.API_KEY}&units=imperial`;
  } else {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.API_KEY}&units=imperial`;
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
  The temperature in Fahrenheit is ${apiResponse.main.temp} degrees.`;
}

function printError(request, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(location);
}

window.addEventListener("load", function() {
  document.getElementById('cityForm').addEventListener("submit", handleFormSubmission);
});