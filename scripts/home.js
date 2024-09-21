document.addEventListener("DOMContentLoaded", function() {
    // Type current year
    var currentYear = new Date().getFullYear();

    // Update content id "currentYear"
    var currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    // Type last modification date
    var lastModifiedDate = document.lastModified;

    // Update content id "lastModifiedDate"
    var lastModifiedDateElement = document.getElementById("lastModifiedDate");
    if (lastModifiedDateElement) {
        lastModifiedDateElement.textContent = lastModifiedDate;
    }

    // hamburg button
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('nav ul');

    hamburgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show'); // hide or show menu
        hamburgerMenu.classList.toggle('open'); // icon button
    });

    //Start rendering courses
    const courseList = document.getElementById('course-list');
    const totalCreditsElement = document.getElementById('total-credits');    

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        },
    ];

    // Function to render courses
    function renderCourses(filterSubject = '') {
        courseList.innerHTML = '';

        const filteredCourses = courses.filter(course => {
            if (filterSubject) {
                return course.subject === filterSubject;
            }
            return true;
        });

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');

            if (course.completed) {
                courseCard.classList.add('completed');
            } else {
                courseCard.classList.add('in-progress');
            }

            courseCard.innerHTML = `
            <h3>${course.subject} ${course.number} - ${course.title}</h3>
            <p>Credits: ${course.credits}</p>
            <p>${course.completed ? 'Completed' : 'In Progress'}</p>
            `;

            courseList.appendChild(courseCard);
        });

        // Update total credits dynamically
        const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
        totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }

    // Initial Rendering: All courses
    renderCourses();

    // Filter courses based on user selection
    document.getElementById('all-courses').addEventListener('click', () => renderCourses());
    document.getElementById('cse-courses').addEventListener('click', () => renderCourses('CSE'));
    document.getElementById('wdd-courses').addEventListener('click', () => renderCourses('WDD'));    
});    
