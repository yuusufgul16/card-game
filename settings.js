// Müzik elementini seç
let backgroundMusic = document.getElementById('backgroundMusic');

// Başlangıç ses seviyesini %10 olarak ayarla
backgroundMusic.volume = 0.03;

// Ses seviyesi kaydırıcısını (slider) başlangıçta %10'a ayarla
let volumeSlider = document.getElementById('volumeSlider');
volumeSlider.value = 0.03;

// Ayarlar menüsünün görünürlüğünü değiştir
document.getElementById('settingsButton').addEventListener('click', () => {
    let settingsMenu = document.getElementById('settingsMenu');
    // Menü görünüyorsa gizle, gizliyse göster
    if (settingsMenu.style.display === 'none' || settingsMenu.style.display === '') {
        settingsMenu.style.display = 'block';
    } else {
        settingsMenu.style.display = 'none';
    }
});

// Müziği açıp kapatma
document.getElementById('toggleMusicButton').addEventListener('click', () => {
    let musicIcon = document.getElementById('toggleMusicButton').querySelector('i');

    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.classList.remove('fa-volume-mute');
        musicIcon.classList.add('fa-music');
    } else {
        backgroundMusic.pause();
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-volume-mute');
    }
});

// Ses seviyesini ayarlama
volumeSlider.addEventListener('input', (e) => {
    backgroundMusic.volume = e.target.value;
});

// Restart butonuna tıklama işlemi
document.getElementById('restartButton').addEventListener('click', () => {
    // Başlık göstermek için bir div oluştur
    let titleDisplay = document.createElement('div');
    titleDisplay.id = 'titleDisplay';
    titleDisplay.textContent = 'Shuffling Cards';
    document.body.appendChild(titleDisplay);

    // Geri sayımı başlat
    let countdown = 3; // Geri sayım süresi
    let countdownDisplay = document.createElement('div');
    countdownDisplay.id = 'countdownDisplay';
    countdownDisplay.textContent = countdown;
    document.body.appendChild(countdownDisplay);

    let interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownDisplay.textContent = countdown;
        } else {
            clearInterval(interval);
            document.body.removeChild(titleDisplay);
            document.body.removeChild(countdownDisplay);
            location.reload(); // Sayfayı yeniden yükle
        }
    }, 1000);
});


document.getElementById('backToMenuButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Ana menü sayfasına yönlendirme
});



