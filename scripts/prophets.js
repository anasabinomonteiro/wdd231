    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

    //Button selection
    const all = document.querySelector("#all");
    const utah = document.querySelector("#utah");
    const nonus = document.querySelector("#nonus");
    const old95 = document.querySelector("#old95");
    const child10 = document.querySelector("#child10");
    const service = document.querySelector("#service");

    //Fetch Function

    const getProphets = async (filter = "all") => {
        const response = await fetch(url);
        const data = await response.json();
        let prophets = data.prophets;

        switch (filter) {
            case "utah":
                prophets = prophets.filter((prophet) =>
                    prophet.birthplace ==="Utah");
                break;
               
            case "nonus":
                prophets = prophets.filter((prophet) =>
                    prophet.birthplace ==="England"); //at this moment there is no other prophet outside the USA, apart from England.
                break; 
            
            case "old95":
                prophets = prophets.filter((prophet) =>
                    getAge(prophet.birthdate, prophet.death) >=95);
                break;      

            case "child10":
                prophets = prophets.filter((prophet) =>
                    prophet.numofchildren >= 10);
                break;  
            
            case "service":
                prophets = prophets.filter((prophet) =>
                    prophet.length >= 15);
                break;
            default:
                break;
        }
        displayProphets(prophets); //Display filtered Prophets  
    }
    
    //Function to calculate death age
    function getAge(birthdate, deathDate) {
        const birth = new Date(birthdate);
        const death = deathDate ? new Date(deathDate) : new Date(); //if live use current date
        return death.getFullYear() - birth.getFullYear(); 
    } 

              
    // Displaying prophet data
    function displayProphets(prophets) {
        const cards = document.querySelector('#cards');
        cards.innerHTML = ''; // Clean before add new

        prophets.forEach((prophet, index) => {
            let card = document.createElement('section');
            let fullname = document.createElement('h2');
            let portrait = document.createElement('img');
            let birthdate = document.createElement('p');
            let birthplace = document.createElement('p');

            //Birth place and Date content
            birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
            birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

            // Name display
            fullname.textContent = `${prophet.name} ${prophet.lastname}`;
            
            //Attributtes
            portrait.setAttribute('src', prophet.imageurl);
            portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} -${index + 1}th Latter-Day President`);
            portrait.setAttribute('loading', 'lazy');
            portrait.setAttribute('width', '340');
            portrait.setAttribute('height', '440');

            //attach elements to the card
            card.appendChild(fullname);
            card.appendChild(birthdate);
            card.appendChild(birthplace);
            card.appendChild(portrait);
            

            //add to container "cards"
            cards.appendChild(card);
        });
    }

// Button click function
function handleFilterClick(event) {
    const filter = event.target.id;
    getProphets(filter);
}

// Add event listener to buttons
all.addEventListener('click', handleFilterClick);
utah.addEventListener('click', handleFilterClick);
nonus.addEventListener('click', handleFilterClick);
old95.addEventListener('click', handleFilterClick);
child10.addEventListener('click', handleFilterClick);
service.addEventListener('click', handleFilterClick);

// Start with all Prophets
getProphets();