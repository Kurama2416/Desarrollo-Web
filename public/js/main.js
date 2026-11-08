document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;

    function setMenu(open) {
        navToggle.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
    }

    navToggle.addEventListener('click', () => {
        setMenu(!navMenu.classList.contains('active'));
    });

    // Cierra el menú al tocar un enlace
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') setMenu(false);
    });
});