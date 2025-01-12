const apikey = "537d30b8486c3a473f18ee79a5d21ed8";

const weatherdataE1 = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formE1 = document.querySelector("form");

formE1.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getweatherData(cityValue);
});

async function getweatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        
        const temperature= Math.floor(data.main.temp);

        const description= data.weather[0].description;

        const icon=data.weather[0].icon;

        const windSpeed = 3.6*(Math.floor(data.wind.speed));

        const details=[
            `Feels like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${Math.floor(data.main.humidity)}%`,
             `Wind speed: ${windSpeed} km/h`
        ]

        weatherdataE1.querySelector(".icon").innerHTML=` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather image">`

        weatherdataE1.querySelector(".temperature").textContent=`${temperature}°C`;

        weatherdataE1.querySelector(".discription").textContent=description;

        weatherdataE1.querySelector(".details").innerHTML=details.map((details)=> `<div>${details} </div>`).join("");

        // ithula .join poddathu data varum pothu gama va illama panna



    } catch (error) {
        weatherdataE1.querySelector(".icon").innerHTML=""

        weatherdataE1.querySelector(".temperature").textContent="";

        weatherdataE1.querySelector(".discription").textContent="Something wrong, please try again later";

        weatherdataE1.querySelector(".details").innerHTML="";
       
    }
}
