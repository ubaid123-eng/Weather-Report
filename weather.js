const city = document.getElementById("input-city");
const btnEvent = document.getElementById("search-btn");

let countryName = document.getElementById("countryName");
let countryRegion = document.getElementById("countryRegion");
let Clouds = document.getElementById("Clouds");
let Humidity = document.getElementById("Humidity");
let OverAll = document.getElementById("OverAll");
let LastUpdatedAt = document.getElementById("LastUpdatedAt");





async function getWeatherReport(cityName) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${cityName}&aqi=yes`);
    const data = await response.json();
      
      if (data.error) {
          //throw new Error(data.error.message);
          alert("please enter the correct city name");
      }
      
      return data;
  } catch (error) {
      // throw new Error("Failed to fetch weather data. Please try again later.");
      alert(error.message);
  }
}





btnEvent.addEventListener("click", async () => {
  const cityName = city.value.trim();
  
  if (!cityName) {
      alert("Please enter a city name.");
      return;
  }
  
  try {
      const weatherReport = await getWeatherReport(cityName);
      updateWeatherUI(weatherReport);
  } catch (error) {
      alert(error.message);
  }
});


function updateWeatherUI(weatherReport) {
  countryName.innerText = `${weatherReport['location'].country}`;
  countryRegion.innerText = `${weatherReport['location'].region}`;
  Clouds.innerText = `${weatherReport['current'].cloud + '%'}`;
  Humidity.innerText = `${weatherReport['current'].humidity + '%'}`;
  OverAll.innerText = `${weatherReport['current']['condition'].text}`;
  LastUpdatedAt.innerText = `${weatherReport['current'].last_updated}`;
}