const apikey= "029c8c109a23e2b962eb81580156e41d";

const weatherDataE1 = document.getElementById("weather-data")

const cityInputE1 = document.getElementById("city-input")

const formE1= document.querySelector("form")

formE1.addEventListener("submit",(event) => {
    event.preventDefault();
    const cityValue = cityInputE1.ariaValueMax;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not OK")
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]
        weatherDataE1.querySelector(".icon").innerHTML = ` <img src="https://openweathermap.org/img/wn//${icon}.png" alt="Weather icon">`;
        weatherDataE1.querySelector(".temperature").textContent= `${temperature}°C`;
        weatherDataE1.querySelector(".desciption").textContent= description;
        weatherDataE1.querySelector(".details").innerHTML = details.map((details) => `<div>${detail}</div>`)
        .join("");
    }catch(error){
        weatherDataE1.querySelector(".icon").innerHTML = "";
        weatherDataE1.querySelector(".temperature").textContent= "";
        weatherDataE1.querySelector(".desciption").textContent= "An error happened,please try again later!";
        weatherDataE1.querySelector(".details").innerHTML = "";

    }
}



