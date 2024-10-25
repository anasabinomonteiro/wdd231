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
})