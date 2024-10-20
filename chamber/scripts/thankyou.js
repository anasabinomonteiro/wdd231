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

    document.addEventListener("DOMContentLoaded", function (){
        //localStorage
        const firstname = localStorage.getItem('firstname');
        const lastname = localStorage.getItem('lastname');
        const email = localStorage.getItem('email');
        const phone = localStorage.getItem('phone');
        const organization = localStorage.getItem('organization');
        const timestamp = localStorage.getItem('timestamp');

        //Show data in the page
        if (document.getElementById('firstname')) {
            document.getElementById('firstname').textContent = firstname ? firstname : 'N/A';
        }
        if (document.getElementById('lastname')) {
            document.getElementById('lastname').textContent = lastname ? lastname : 'N/A';
        }
        if (document.getElementById('email')) {
            document.getElementById('email').textContent = email ? email : 'N/A';
        }
        if (document.getElementById('phone')) {
            document.getElementById('phone').textContent = phone ? phone : 'N/A';
        }
        if (document.getElementById('organization')) {
            document.getElementById('organization').textContent = organization ? organization : 'N/A';
        }
        if (document.getElementById('timestamp')) {
            document.getElementById('timestamp').textContent = timestamp ? timestamp : 'N/A';
        }   

        //Clean afer display        
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('organization');
        localStorage.removeItem('timestamp');
    });    
})