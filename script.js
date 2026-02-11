// Odotetaan, että sivu latautuu
document.addEventListener('DOMContentLoaded', () => {
    
    // Päivitä vuosiluku footeriin automaattisesti
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log("Portfolio ladattu onnistuneesti!");
});