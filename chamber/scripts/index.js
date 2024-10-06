document.addEventListener("DOMContentLoaded", async function() {
    // Type current year
    var currentYear = new Date().getFullYear();
    var currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    // Type last modification date
    var lastModifiedDate = document.lastModified;
    var lastModifiedDateElement = document.getElementById("lastModifiedDate");
    if (lastModifiedDateElement) {
        lastModifiedDateElement.textContent = lastModifiedDate;
    }

    // Weather API Integration
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const weatherDesc = document.querySelector('#weather-desc');

    const apiKey = '44e7b0c6a8eb0b60055ad80c0639a425';
    const lat = '-23.55750';
    const lon = '-46.68462';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    async function fetchWeather() {
        try {
            const response = await fetch(weatherUrl);
            if(response.ok) {
                const data = await response.json();
                displayWeather(data);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }        
    }
    function displayWeather(data) {
        currentTemp.innerHTML = `${data.main.temp}&deg;C`;
        const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;                      
        const description = data.weather[0].description;

        weatherIcon.setAttribute('src' , iconSrc);
        weatherIcon.setAttribute('alt', description);
        weatherDesc.textContent = description;
    }

    // Call Function
    fetchWeather();


})