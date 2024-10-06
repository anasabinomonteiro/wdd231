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

        // Function -create member list 
        function createMemberListItem(member) {
            return `
                <div class="member-list-item">
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

        if (gridButton){
            gridButton.addEventListener('click', () => {
                memberContainer.classList.add('grid-view');
                memberContainer.classList.remove('list-view');
            });
        } else {
            console.error('Grid view not found');
        }

        if (listButton){
            listButton.addEventListener ('click', () => {
                memberContainer.classList.add('list-view');
                memberContainer.classList.remove('grid-view');
            });
        }else {
            console.error('List view not found');
        }

        //Call render
        renderMembers(members);
    } catch(error) {
        console.error('Error loading members', error);
    }

    // Weather API Integration
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const weatherDesc = document.querySelector('#weather-desc');
    const humidityElement = document.querySelector('#humidity');
        
    const apiKey = '44e7b0c6a8eb0b60055ad80c0639a425';
    const lat = '-23.55750';
    const lon = '-46.68462';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=3&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=3&appid=${apiKey}&units=metric`;
    
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
        const temperature = Math.round(data.main.temp);
        currentTemp.innerHTML = `${data.main.temp}&deg;C`;


        //Update icon and weather for all weather events
        weatherIcon.innerHTML = '';
        weatherDesc.innerHTML = '';

        //Create and append weather icon
        const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;                      
        const description = data.weather[0].description;
        const icon = document.createElement('img');
        icon.setAttribute('src' , iconSrc);
        icon.setAttribute('alt', description);
        weatherIcon.appendChild(icon);
        weatherDesc.textContent = description;
        //Show humidity
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    }

    async function fetchWeatherForecast() {
        try {
            const response = await fetch(forecastUrl);
            if(response.ok) {
                const data = await response.json();
                displayWeatherForecast(data);
            } else {
                throw new Error(await response.text());
            }
        }catch (error) {
            console.log('Error fetching weather forecast', error);
        }        
    }

    function displayWeatherForecast(data) {
        const forecastContainer = document.querySelector('#forecast');

        //Clearing previous forecasts, if applicable
        forecastContainer.innerHTML = '';

        const today = new Date();
        const todayDate = today.setHours(0, 0, 0, 0);

        const tomorrowDate = new Date(today);
        tomorrowDate.setDate(today.getDate() + 1);
        tomorrowDate.setHours(0, 0, 0, 0);

        const dayAferTomorrowDate = new Date(today);
        dayAferTomorrowDate.setDate(today.getDate() + 2);
        dayAferTomorrowDate.setHours(0, 0, 0, 0);

        let forecastCount = 0;
        data.list.forEach(forecast => {
            const forecastDate = new Date(forecast.dt * 1000).setHours(0, 0, 0, 0);

            if (forecastDate.getTime() === todayDate.getTime() ||
                forecastDate.getTime() === tomorrowDate.getTime() ||
                forecastDate.getTime() === dayAferTomorrowDate.getTime()) {

                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');

                const date = new Date(forecast.dt * 1000);
                const options = {weekday: 'long' };
                const dayName = new Intl.DateTimeFormat('en-US', options).format(date);

                const dateText = forecastDate.getTime() === todayDate.getTime() ? 'Today': dayName;

                const temp = Math.round(forecast.main.temp);
                const tempElem = document.createElement('p');
                tempElem.innerHTML = `${dateText}: ${temp}&deg;C`;

                forecastItem.appendChild(tempElem);

                forecastContainer.appendChild(forecastItem);

                forecastCount++;
                if(forecastCount >= 3) return;
            }
        });
     }
    // Call Function

    //Current weather
    fetchWeather();

    //Weather forecast
    fetchWeatherForecast();

    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if(response.ok) {
                const members = await response.json();
                displaySpotlightMembers(members);
            }else {
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
            const membershipLevelElem = document.createElement('p')  ;
            membershipLevelElem.textContent = `Membership Level: ${member.membership_level === 3 ? 'Gold' : 'Silver'}`;
            memberCard.appendChild(membershipLevelElem);
           //Add card to memberContainer
           spotlightContainer.appendChild(memberCard);
        });
    }

    function shuffleArray(array) {
        for (let i = array.lenght - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array [j]] = [array[j], array[i]];
        }
        return array;
    }
    //Call function
    fetchMembers()
    });
