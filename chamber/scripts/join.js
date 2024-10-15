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
    //Modal
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
        }

      window.closeModal = function(modalId) {
        document.getElementById(modalId),style.display = 'none';
        }    
      window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
      }   
     // Load benefits from json(membershiplevel)
     try {
        const response = await fetch('data/membershiplevel.json');
        const data = await response.json();
        const modalContainer = document.getElementById('modal-container');
        const membershipCardsContainer = document.querySelector('.membership-cards-container');

        if (!membershipCardsContainer || !modalContainer) {
            throw new Error('Containers not found');
        }

        const ids = ["np-card", "bronze-card", "silver-card", "gold-card"];

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
            <span class="close" onclick="closeModal('modal-${index}')>&times</span>
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


