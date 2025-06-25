const apiKey = "f892033398442b92bc05cbe5a2f0e44c";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("search").value.trim();
  if (city) fetchWeather(city);
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function fetchWeather(query = "fetch:ip") {
  axios
    .get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${query}`)
    .then((response) => {
      const data = response.data;
      const current = data.current;
      const location = data.location;

      document.getElementById("temperature").textContent = `${current.temperature}°C`;
      document.getElementById("description").textContent = current.weather_descriptions[0];
      document.getElementById("weather-icon").src = current.weather_icons[0];
      document.getElementById("datetime").textContent = `Time: ${location.localtime}`;
      document.getElementById("location").textContent = `${location.name}, ${location.region}, ${location.country}`;

      document.getElementById("uv").textContent = current.uv_index ?? "--";
      document.getElementById("wind").textContent = `${current.wind_speed} km/h (${current.wind_dir})`;
      document.getElementById("sunrise").textContent = `Sunrise: ${current.astro?.sunrise ?? "--"}`;
      document.getElementById("sunset").textContent = `Sunset: ${current.astro?.sunset ?? "--"}`;
      document.getElementById("humidity").textContent = `${current.humidity}%`;
      document.getElementById("visibility").textContent = `${current.visibility} km`;
      document.getElementById("air-quality").textContent = `${current.air_quality?.["pm2_5"] ?? "--"} µg/m³`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Unable to retrieve weather. Please try again later.");
    });
}

fetchWeather();
