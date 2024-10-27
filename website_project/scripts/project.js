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

    //************Activity_Ideas Page******************/
    const activityList = document.getElementById("activity-list");
    const filter = document.getElementById("activity-filter");

    // Json data
    async function fetchActivities() {
        try {
            const response = await fetch('data/activities.json');
            const activities = await response.json();
            displayActivities(activities);
            filterActivities(activities); // filter configuration
        } catch (error) {
            console.error("Error for search activities", error);
        }        
    }

    // Display activities
    function displayActivities(activities) {
        activityList.innerHTML = ""; // clean the filter
        activities.forEach(activity => {
            const activityCard = document.createElement("div");
            activityCard.classList.add("activity-card");
            activityCard.innerHTML = `
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <p><strong>Category:</strong> ${activity.category}</p>
            <img src="${activity.image}" alt="${activity.title} image" class="activity-image" loading="lazy">
            `;
            activityList.appendChild(activityCard);
        });
    }

    // Filter activities
    function filterActivities(activities) {
        filter.addEventListener("change", () => {
            const selectedCategory = filter.value;
            const filteredActivities = selectedCategory === "all"
            ? activities
            : activities.filter(activity => activity.category === selectedCategory);
            displayActivities(filteredActivities);
        });
    }

    fetchActivities(); // Call function to Display activities

    //************Trivia Page******************/
    document.getElementById('loadQuiz').addEventListener('click', loadQuiz);

    async function loadQuiz() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=23');
            const data = await response.json();
            console.log('json ok:', data);
            displayQuestions(data.results);
        } catch (error) {
            console.error("Error fetching the quiz data:", error);
        }        
    }

    function displayQuestions(questions) {
        const quizContainer = document.getElementById('quizContainer');
        quizContainer.innerHTML = '';

        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            // Question
            const questionText = document.createElement('p');
            questionText.innerHTML = `Q${index + 1}: ${question.question}`;
            questionElement.appendChild(questionText);

            // Answer
            const answers = [...question.incorrect_answers, question.correct_answer].sort(() => 0.5 - Math.random());

            answers.forEach(answer => {
                const answerButton = document.createElement('button');
                answerButton.textContent = answer;
                answerButton.classList.add('answer');

                // Add event to verify the answer
                answerButton.addEventListener('click', () => {
                    if (answer === question.correct_answer) {
                        answerButton.classList.add('correct-answer');
                        setTimeout(() => {
                            answerButton.classList.remove('correct-answer');
                        }, 1000); // Animation duration (1000ms = 1s)
                    } else {
                        answerButton.style.backgroundColor = 'lightcoral';
                    }
                });
                questionElement.appendChild(answerButton);
            });
            quizContainer.appendChild(questionElement);
        });
    }

    // Activity Submit
    const form = document.getElementById('form-submit');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.timestamp = new Date().toLocaleString(); // Adiciona a data/hora atual
        console.log('Dados a serem armazenados:', JSON.stringify(data));

        localStorage.setItem('formData', JSON.stringify(data)); // Armazena os dados no localStorage

        window.location.href = "thankyou.html"; // Redireciona para a página de agradecimento
    });
});
