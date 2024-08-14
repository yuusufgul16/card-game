document.getElementById('startButton').addEventListener('click', function() {
    window.location.href = 'gamescreen.html'; // Oyun sayfasına yönlendirme
});

document.getElementById('instructionsButton').addEventListener('click', function() {
    window.location.href = 'instructions.html'; // Instructions sayfasına yönlendirme
});

// "About Me" butonuna tıklayınca modalı aç
document.getElementById('aboutButton').addEventListener('click', function() {
    document.getElementById('aboutModal').style.display = 'block';
});

// Close butonuna tıklayınca modalı kapat
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('aboutModal').style.display = 'none';
});

// Modalın dışına tıklayınca modalı kapat
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('aboutModal')) {
        document.getElementById('aboutModal').style.display = 'none';
    }
});



