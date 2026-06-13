document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling (prevent default for demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
            btn.style.backgroundColor = 'var(--green)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // PROJECT ADDITION LOGIC
    const addProjectForm = document.getElementById('addProjectForm');
    const projectsContainer = document.getElementById('projectsContainer');

    // Load projects from localStorage if any exist
    const loadProjects = () => {
        const savedProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
        savedProjects.forEach(proj => {
            const projectHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${proj.image}" alt="${proj.title}">
                        <span class="project-badge text-green">${proj.category}</span>
                    </div>
                    <div class="project-info">
                        <h3>${proj.title}</h3>
                        <p>${proj.description}</p>
                        <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            `;
            projectsContainer.insertAdjacentHTML('afterbegin', projectHTML);
        });
    };

    // Initialize loaded projects
    if (projectsContainer) {
        loadProjects();
    }

    // Handle form submission
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('projTitle').value;
            const category = document.getElementById('projCategory').value;
            const image = document.getElementById('projImage').value;
            const description = document.getElementById('projDesc').value;
            
            const newProject = { title, category, image, description };
            
            // Save to local storage
            const savedProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
            savedProjects.push(newProject);
            localStorage.setItem('portfolioProjects', JSON.stringify(savedProjects));
            
            // Add to UI immediately
            const projectHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${image}" alt="${title}">
                        <span class="project-badge text-green">${category}</span>
                    </div>
                    <div class="project-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            `;
            projectsContainer.insertAdjacentHTML('afterbegin', projectHTML);
            
            // Reset form and show success
            addProjectForm.reset();
            const btn = addProjectForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Project Added! <i class="fas fa-check"></i>';
            btn.style.backgroundColor = 'var(--green)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = 'var(--primary-color)';
            }, 3000);
        });
    }

    // Quick review form submission handling
    const quickReviewForm = document.querySelector('.quick-review-form');
    if (quickReviewForm) {
        quickReviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for your feedback!');
            quickReviewForm.reset();
        });
    }

    // Scroll active link update
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
