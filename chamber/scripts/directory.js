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

    // Fetch the members data
    const memberContainer = document.getElementById("memberContainer");
    
    try {
        const jsonData = await fetch('data/members.json'); // Ensure the path is correct
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
                </div>
            `;
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
                </div>
            `;
        }

        // Render members - grid or list view
        function renderMembers(viewType) {
            memberContainer.innerHTML = '';
            if (viewType === 'grid') {
                memberContainer.classList.add('grid-view');
                memberContainer.classList.remove('list-view');
                members.forEach(member => {
                    memberContainer.innerHTML += createMemberCard(member);
                });
            } else if (viewType === 'list') {
                memberContainer.classList.add('list-view');
                memberContainer.classList.remove('grid-view');
                members.forEach(member => {
                    memberContainer.innerHTML += createMemberListItem(member);
                });
            }
        }

        // Default - grid view
        renderMembers('grid');

        // Toggle between grid and list views
        document.getElementById('gridView').addEventListener('click', () => {
            renderMembers('grid');
        });

        document.getElementById('listView').addEventListener('click', () => {
            renderMembers('list');
        });

    } catch (error) {
        console.error("Error fetching the JSON data:", error);
    }
});
