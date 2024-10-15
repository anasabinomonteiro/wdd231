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
        const firstName = localStorage.getItem('firstname');
        const lastName = localStorage.getItem('lastname');
        const email = localStorage.getItem('email');
        const phone = localStorage.getItem('phone');
        const organization = localStorage.getItem('organization');
        const timestamp = localStorage.getItem('timestamp');

        //Show data in the page
        document.getElementById('firstname').textContent = firstName;
        document.getElementById('lastname').textContent = lastName;
        document.getElementById('email').textContent = email;
        document.getElementById('phone').textContent = phone;
        document.getElementById('organization').textContent = organization;
        document.getElementById('timestamp').textContent = timestamp;        
    });    
})