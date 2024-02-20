// OpenWeatherMap API key and URL
const apiKey = "ad23f9e08b7b4f0e50887b7b9ea618a1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements
const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchButton");
const cityElement = document.getElementById("cityName");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("windSpeed");
const rainfallElement = document.getElementById("rainfall");
const dateTimeElement = document.getElementById("DateTime");

// Function to update weather data in Local Storage
function updateLocalStorage(city, weatherData) {
    localStorage.setItem('weatherData_' + city, JSON.stringify(weatherData));
}

// Function to get weather data from Local Storage
function getWeatherDataFromLocalStorage(city) {
    var storedData = localStorage.getItem('weatherData_' + city);
    return storedData ? JSON.parse(storedData) : null;
}

// Function to display past weather data in a table format
function displayPastWeatherTable(data) {
    let tableHTML = '<h3>Past seven days weather of Adelaide city</h3>';
    tableHTML += '<table class="week-table">';
    tableHTML += '<tr><th>Day of Week</th><th>Date</th><th>Weather Condition</th><th>Humidity</th><th>Weather Icon</th><th>Temperature</th><th>Pressure</th><th>Wind Speed</th></tr>';

    data.forEach((weather) => {
        tableHTML += `<tr>`;
        tableHTML += `<td>${weather.Day_of_Week}</td>`;
        tableHTML += `<td>${weather.Day_and_Date}</td>`;
        tableHTML += `<td>${weather.Weather_Condition}</td>`;
        tableHTML += `<td>${weather.Humidity}</td>`;
        // Display the weather icon using the displayWeatherIcon function
        tableHTML += `<td class="weather-icon"><img src="http://openweathermap.org/img/w/${weather.Weather_Icon}.png" alt="weather-icon" /></td>`;
        tableHTML += `<td>${weather.Temperature}°C</td>`;
        tableHTML += `<td>${weather.Pressure} Pa</td>`;
        tableHTML += `<td>${weather.Wind_Speed} m/s</td>`;
        tableHTML += `</tr>`;
    });

    tableHTML += '</table>';
    document.getElementById("weekContainer").innerHTML = tableHTML;
}

// Function to fetch past weather data
async function pastWeatherData(callback) {
    try {
        // Fetching past weather data from PHP
        let url = `http://localhost/weather_app/data.php`;
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let data = await response.json();
            callback(data);
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to check and display weather information for a given city
async function checkWeather(city) {
    try {
        // Check if there is stored weather data for the city in Local Storage
        const storedWeatherData = getWeatherDataFromLocalStorage(city);

        if (storedWeatherData) {
            // Display an info message that the city's info is already stored
            displayInfoMessage(`Weather data for ${city} is already stored.`);
            // Use the stored weather data from Local Storage
            displayWeatherData(storedWeatherData);
        } else {
            // Fetch weather data from OpenWeatherMap API
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            const data = await response.json();

            // Checks if the API response contains an error message
            if (data.cod && data.message) {
                // Display an error message for incorrect city
                displayError();
                return;
            }

            // Update Local Storage with the fetched weather data
            updateLocalStorage(city, data);

            // Display the fetched weather data
            displayWeatherData(data);
        }
    } catch (error) {
        console.error(error);
        displayError();
    }
}

// Function to display weather data
function displayWeatherData(data) {
    cityElement.textContent = data.name || "N/A";
    temperatureElement.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ios/50/000000/thermometer.png" alt="temperature-icon"/> Temperature: ${data.main && data.main.temp}°C`;
    humidityElement.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ios/50/000000/humidity.png" alt="humidity-icon"/> Humidity: ${data.main && data.main.humidity}%`;
    windElement.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ios/50/000000/wind.png" alt="wind-icon"/> Wind: ${data.wind && data.wind.speed} km/h`;

    if (data.rain) {
        rainfallElement.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ios/50/000000/rain.png" alt="rain-icon"/> Rainfall: ${data.rain['1h']}mm`;
    } else {
        rainfallElement.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ios/50/000000/no-rain.png" alt="no-rain-icon"/> Rainfall: No Rain`;
    }

    const timestampOffset = data.timezone;
    const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
    const localDate = new Date(timestamp * 1000).toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'full' });
    const localTime = new Date(timestamp * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', timeStyle: 'short' });

    dateTimeElement.innerHTML = `<img class="weather-icon" src="https://img.icons8.com/ios/50/000000/clock.png" alt="clock-icon"/> Date: ${localDate}<br> Time: ${localTime}`;

    // Call the pastWeatherData function with the displayPastWeatherTable callback
    pastWeatherData(displayPastWeatherTable);
}

// Function to display an info message
function displayInfoMessage(message) {
    // You can customize this to display the message as needed
    console.log(message);
}

// Function to display an error message
function displayError() {
    cityElement.textContent = "Error fetching data";
    temperatureElement.textContent = "";
    humidityElement.textContent = "";
    windElement.textContent = "";
    rainfallElement.textContent = "";
    dateTimeElement.textContent = "";
}

// Event listener for the search button to check weather for the entered city
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Initial weather check for the default city on page load
document.addEventListener("DOMContentLoaded", () => {
    const defaultCity = "Adelaide";
    checkWeather(defaultCity);
});
