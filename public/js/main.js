document.addEventListener('DOMContentLoaded', () => {

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

    }

    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            if (navMenu) {
                navMenu.classList.remove('active');
            }

        });

    });

});