document.addEventListener("DOMContentLoaded", async function () {
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

    // hamburg button
    const hamburgMenu = document.getElementById('hamburg-menu');
    const navMenu = document.querySelector('nav ul');

    hamburgMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show'); // hide or show menu
        hamburgMenu.classList.toggle('open'); // icon button
    });

    // Fetch the members data
    const memberContainer = document.getElementById("memberContainer");

    try {
        const jsonData = await fetch('data/members.json');
        const members = await jsonData.json();

        // Function to create the member card
        function createMemberCard(member) {
            return `
                <div class="member-card">
                    <img src="images/${member.icon}" alt="${member.name} icon">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p>Membership Level: ${member.membership_level}</p>
                </div>`;
        }

        function renderMembers(members) {
            memberContainer.innerHTML = '';

            members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member-item');
                memberDiv.innerHTML = createMemberCard(member);
                memberContainer.appendChild(memberDiv);
            });
        }
        // Render members - grid or list view
        const gridButton = document.querySelector("#gridView");
        const listButton = document.querySelector("#listView");

        if (gridButton) {
            gridButton.addEventListener('click', () => {
                memberContainer.classList.add('grid-view');
                memberContainer.classList.remove('list-view');
            });
        } else {
            console.error('Grid view not found');
        }

        if (listButton) {
            listButton.addEventListener('click', () => {
                memberContainer.classList.add('list-view');
                memberContainer.classList.remove('grid-view');
            });
        } else {
            console.error('List view not found');
        }

        //Call render
        renderMembers(members);
    }
    catch (error) {
        console.error('Error loading members', error);
    }

    // Weather API Integration       
    const apiKey = '44e7b0c6a8eb0b60055ad80c0639a425';
    const lat = '-22';
    const lon = '-49';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=3&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?id=3448433&cnt=3&lat=${lat}&lon=${lon}&cnt=3&appid=${apiKey}&units=metric`;

    const weatherIcon = document.getElementById('weather-icon');
    const weatherDesc = document.getElementById('weather-desc');
    const currentTemp = document.getElementById('current-temp');
    const currentTempForcast = document.getElementById('current-temp-forcast');
    const humidityElement = document.getElementById('humidity');
    const highElement = document.getElementById('high');
    const lowElement = document.getElementById('low');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');
    const forecastContainer = document.getElementById('forecast');

    // Capitalize
    function capitalizeDescription(description) {
        return description.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Get current weather
    async function getWeatherData() {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        // Creating and adding icon temperature
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        const description = capitalizeDescription(data.weather.map(event => event.description).join(' , '));
        const icon = document.createElement('img');
        icon.setAttribute('src', iconSrc);
        icon.setAttribute('alt', description);
        weatherIcon.innerHTML = ''; // clean  previous item if exist
        weatherIcon.appendChild(icon);

        // Update  description and temperature
        weatherDesc.textContent = description;
        currentTemp.textContent = Math.round(data.main.temp); // round temperature

        // Humidity
        highElement.textContent = `High: ${data.main.temp_max}`;
        lowElement.textContent = `Low: ${data.main.temp_min}`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}`;
        sunriseElement.textContent = `Sunrise: ${data.sys.sunrise}`;
        sunsetElement.textContent = `Sunset: ${data.sys.sunset}`;   
     }

    // Forecast (3 days)
    async function getWeatherForecast() {
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json(); 
            
            console.log(data);

        forecastContainer.innerHTML = ''; // clean  previous item if exist

        if (!data.list || data.list.length === 0) {
            console.error("No forecast available");
            return;
        }

        // Forecast for 3 days
        for (let i = 0; i < data.list.length && i < 3; i++) {
            let forecastDay = data.list[i];

            // Day Temp
            if (forecastDay && forecastDay.main !== undefined) {
            let dayTemp = Math.round(forecastDay.main.temp); 
            let dayName = new Date(forecastDay.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

            // Create forecast item
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `<strong>${dayName}:</strong> ${dayTemp}°C`;
            forecastContainer.appendChild(forecastItem);
            }else {
                console.error(`Missing temperature data for day ${i + 1}`);
            }
        }        
        } catch(error)  {
        console.error('Error fetching forecast data:', error);
       }
      }

    // Call functions
    getWeatherData();
    getWeatherForecast();


    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (response.ok) {
                const members = await response.json();
                displaySpotlightMembers(members);
            } else {
                throw new Error('Error loading members');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    function displaySpotlightMembers(members) {
        const spotlightContainer = document.getElementById('spotlight-members');
        //Silver or Gold
        const qualifiedMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
        //Shuffle
        const shuffledMembers = shuffleArray(qualifiedMembers);
        //Limit for 2 or 3 display Shuffle
        const randomMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2);

        //Display selected Members
        randomMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('spotlight-card');
            //Business Name
            const nameElem = document.createElement('h2');
            nameElem.textContent = member.name;
            memberCard.appendChild(nameElem);
            //Business icon
            const iconElemen = document.createElement('img');
            iconElemen.src = 'images/' + member.icon;
            iconElemen.alt = `${member.name} logo`;
            memberCard.appendChild(iconElemen);
            //Phone
            const phoneElem = document.createElement('p');
            phoneElem.textContent = `Phone: ${member.phone}`;
            memberCard.appendChild(phoneElem);
            //Address
            const addressElem = document.createElement('p');
            addressElem.textContent = `Address: ${member.address}`;
            memberCard.appendChild(addressElem);
            //Link for site
            const websiteElem = document.createElement('a');
            websiteElem.href = members.website;
            websiteElem.textContent = member.website;
            websiteElem.target = '_blank';
            memberCard.appendChild(websiteElem);
            //Level of Association
            const membershipLevelElem = document.createElement('p');
            membershipLevelElem.textContent = `Membership Level: ${member.membership_level === 3 ? 'Gold' : 'Silver'}`;
            memberCard.appendChild(membershipLevelElem);
            //Add card to memberContainer
            spotlightContainer.appendChild(memberCard);
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //Call function
    fetchMembers()
});
