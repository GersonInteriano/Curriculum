document.addEventListener('DOMContentLoaded', function() {
    // Add interactivity to the CV

    // Animate sections when they come into view
    const sections = document.querySelectorAll('.cv-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Add hover effect to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
            category.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'none';
            category.style.boxShadow = 'none';
        });
    });

    // Add click effect to soft skills
    const softSkills = document.querySelectorAll('.soft-skill-tag');
    softSkills.forEach(skill => {
        skill.addEventListener('click', () => {
            skill.style.transform = 'scale(0.95)';
            setTimeout(() => {
                skill.style.transform = 'none';
            }, 200);
        });
    });

    // Animate language bars
    const languageBars = document.querySelectorAll('.language-bar');
    languageBars.forEach(bar => {
        // Trigger animation when bar comes into view
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Width is already set via CSS based on data-level
                    entry.target.style.opacity = 1;
                    barObserver.unobserve(entry.target);
                }
            });
        });

        bar.style.opacity = 0;
        barObserver.observe(bar);
    });
});