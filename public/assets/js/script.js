(() => {
    const indexFile = "/index.html";
    const { pathname, search, hash } = window.location;

    if (!pathname.endsWith(indexFile)) {
        return;
    }

    const cleanPath = (pathname.slice(0, -indexFile.length) || "") + "/";
    const cleanHash = hash === "#home" ? "" : hash;
    window.history.replaceState(null, "", cleanPath + search + cleanHash);
})();

// Odotetaan, että sivu latautuu
document.addEventListener('DOMContentLoaded', () => {
    // Päivitä vuosiluku footeriin automaattisesti
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('primary-navigation');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isOpen));
            navLinks.classList.toggle('is-open', !isOpen);
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('is-open');
            });
        });
    }
});
