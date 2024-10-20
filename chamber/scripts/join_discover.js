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

    //Timestamp
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.value = new Date().toISOString();
    }
         // Load benefits from json(membershiplevel)
     try {
        const response = await fetch('data/membershiplevel.json');
        const data = await response.json();
        console.log(data)

        const modalContainer = document.getElementById('modal-container');
        const membershipCardsContainer = document.querySelector('.membership-cards-container');

        if (!membershipCardsContainer || !modalContainer) {
            throw new Error('Containers not found');
        }
        
        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('membership-card');
            card.id = `card-${index}`;
            card.innerHTML = `
            <h3>${item.level}</h3>
            <button onclick="openModal('modal-${index}')">More Info</button>
            `;
            membershipCardsContainer.appendChild(card);

            //Modal dynamic
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.id = `modal-${index}`;
            modal.innerHTML = `
            <div class="modal-content">
            <span class="close" onclick="closeModal('modal-${index}')">&times;</span>
            <h2>${item.level}</h2>
            <p>Benefits:</p>
            <ul>${item.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
            </div>
            `;
            modalContainer.appendChild(modal);            
        });        

        }catch (error) {
        console.error('Error loading membership levels:', error);
      }         
    });
    
    //Modal
    window.openModal = function(modalId) {
        const modal= document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block' //visible
        }
        }

      window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if(modal) {
            modal.style.display = 'none'; //invisible
        }
        }    

      window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
      } ;


      // ------Discover functions---------//
      // Calendar
      const calendarCells = document.querySelectorAll('.calendar td');

      //Events
      const events = {
        "5": "Local Business Meeting.",
        "11": "Craft products fair.",
        "20": "Small Business Event.",
        "24": "Lecture on technological innovations.",
      };

      //Event Details
      function showEventDetails(date) {
        const sidebar = document.querySelector('.sidebar');
        const eventDetail = document.createElement('div');
        eventDetail.classList.add('event-detail');
        eventDetail.innerHTML = `<h3>Day event ${date}</h3><p>${events[date] || 'No events on this day'}</p>`;

        // Remove before event detail
        const oldEventDetail = document.querySelector('.event-detail');
        if (oldEventDetail) {
            sidebar.removeChild(oldEventDetail);
        }

        // Add new detail
        sidebar.appendChild(eventDetail);
    }
        // Add click event calendar
        calendarCells.forEach(cell => {
            cell.addEventListener('click', function () {
                const selectedDate = this.textContent.trim();
                showEventDetails(selectedDate);
            }           
        )}       
      );

      const sidebar = document.querySelector('.sidebar');
      const lastVisitKey = 'lastVisit';
      const currentVisit = Date.now();

      //Calculate difference
      function getDayDifference(lastVisitTime, currentVisitTime) {
        const oneDay = 1000 * 60 * 60 * 24;
        const differenceInTime = currentVisitTime - lastVisitTime
        return Math.floor(differenceInTime / oneDay);
      }

      function displayMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('visit-message');
        messageDiv.innerHTML = `<p>${message}</p>`;
        sidebar.appendChild(messageDiv);
      }

      const lastVisit = localStorage.getItem(lastVisitKey);

      if (!lastVisit) {
        displayMessage("Welcome! Let us know if you have any questions.");
      } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const daysSinceLastVisit = getDayDifference(lastVisitTime, currentVisit);

        if (daysSinceLastVisit === 0) {
            displayMessage("Back so soon! Awesome!");
        } else {
            displayMessage(`You last visited ${daysSinceLastVisit} days ago.`);
        }
      }

      localStorage.setItem(lastVisitKey, currentVisit.toString());

      const form = document.querySelector('.fr1');
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        localStorage.setItem('firstname', document.getElementById('firstname').value);
        localStorage.setItem('lastname', document.getElementById('lastname').value);
        localStorage.setItem('email', document.getElementById('email').value);
        localStorage.setItem('phone', document.getElementById('phone').value);
        localStorage.setItem('organization', document.getElementById('organization').value);
        localStorage.setItem('timestamp', new Date().toISOString());

        window.location.href = 'thankyou.html';
      })

    
    
    


