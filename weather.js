const apiKey = "565c1bfeed107969d9cb748132afc8d8";

document.getElementById("fetchWeather").addEventListener("click", async () => {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Fetch current weather
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const weatherData = await weatherResponse.json();
  if (weatherData.cod !== 200) {
    alert("City not found!");
    return;
  }

  // Update weather info
  document.getElementById("location").textContent = weatherData.name;
  document.getElementById("description").textContent = weatherData.weather[0].description;
  document.getElementById("temperature").textContent = `${weatherData.main.temp}°C`;
  document.getElementById("feelsLike").textContent = `Feels like: ${weatherData.main.feels_like}°C`;

  // Update weather icon
  const weatherIcon = document.getElementById("weatherIcon");
  const iconCode = weatherData.weather[0].icon;
  weatherIcon.className = `fas fa-${getWeatherIcon(iconCode)}`;

  // Fetch air quality
  const { coord } = weatherData;
  const aqiResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
  );
  const aqiData = await aqiResponse.json();
  const aqi = aqiData.list[0].main.aqi;
  document.getElementById("aqi").textContent = aqi;
  document.getElementById("aqiStatus").textContent = getAQIStatus(aqi);

  // Fetch 7-day forecast
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  const forecastData = await forecastResponse.json();
  updateForecast(forecastData);
});

function getWeatherIcon(code) {
  // Map OpenWeather icons to FontAwesome icons
  const iconMap = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud-sun",
    "02n": "cloud-moon",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloud",
    "04n": "cloud",
    "09d": "cloud-showers-heavy",
    "09n": "cloud-showers-heavy",
    "10d": "cloud-sun-rain",
    "10n": "cloud-moon-rain",
    "11d": "bolt",
    "11n": "bolt",
    "13d": "snowflake",
    "13n": "snowflake",
    "50d": "smog",
    "50n": "smog",
  };
  return iconMap[code] || "cloud";
}

function getAQIStatus(aqi) {
  if (aqi === 1) return "Good";
  if (aqi === 2) return "Fair";
  if (aqi === 3) return "Moderate";
  if (aqi === 4) return "Poor";
  return "Very Poor";
}

function updateForecast(forecastData) {
  const forecastCards = document.getElementById("forecastCards");
  forecastCards.innerHTML = ""; // Clear previous cards

  const dailyData = forecastData.list.slice(0, 7); // Get next 7 days
  dailyData.forEach((day) => {
    const card = document.createElement("div");
    card.className = "forecast-card";
    const date = new Date(day.dt * 1000).toLocaleDateString();
    card.innerHTML = `
      <h3>${date}</h3>
      <p>${day.weather[0].description}</p>
      <h4>${day.main.temp}°C</h4>
    `;
    forecastCards.appendChild(card);
  });
}
