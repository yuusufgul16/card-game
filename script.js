const cards = document.querySelectorAll(".card");
const messageContainer = document.getElementById('messageContainer');
const attemptsDisplay = document.getElementById('attempts'); // Toplam deneme sayısını gösterecek alan
const timerDisplay = document.getElementById('timer'); // Zamanlayıcıyı gösterecek alan


let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let attempts = 0; // Deneme sayacı
let timerInterval;
let seconds = 0;

function flipCard(e) {
            let clickedCard = e.target;
            if (clickedCard !== cardOne && !disableDeck) {
                playClickSound(); // Ses çal
                clickedCard.classList.add("flip");

                if (!cardOne) {
                    cardOne = clickedCard;
                    return;
                }

        // İkinci kartı ayarla
        cardTwo = clickedCard;
        disableDeck = true; // Desteyi kilitle

        // Kart görsellerini karşılaştır
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);

        attempts++; // Her iki kart açıldığında deneme sayısını artır
        attemptsDisplay.textContent = `Attempts: ${attempts}`; // Deneme sayısını güncelle
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 8) {
            setTimeout(() => {
                stopTimer(); // Zamanlayıcıyı duraklat
                messageContainer.textContent = `Congratulations! You have matched all the cards.  Number of attempts: ${attempts}`;
                setTimeout(() => restartGame(), 3000); // 3 saniye sonra oyunu yeniden başlat
            }, 1000); // 1 saniye animasyon süresi
        }
        // Eğer eşleşiyorsa, kartları dinleyiciden kaldır
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Değişkenleri sıfırla
        cardOne = cardTwo = null;
        disableDeck = false; // Desteyi tekrar aç
    } else {
        // Eşleşmiyorsa, titret ve kartları geri döndür
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 300);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");

            // Değişkenleri sıfırla
            cardOne = cardTwo = null;
            disableDeck = false; // Desteyi tekrar aç
        }, 1000);
    }
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = null;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    
    cards.forEach((card, index) => {
        card.classList.add("shuffling");
        setTimeout(() => {
            card.classList.remove("shuffling");
            let imgTag = card.querySelector("img");
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 1000); // 1 saniye animasyon süresi
    });
}

function startTimer() {
    seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function restartGame() {
    cards.forEach(card => {
        card.classList.remove("flip", "shake"); // Tüm kartların flip ve shake sınıflarını kaldır
        card.removeEventListener("click", flipCard); // Kartların tıklama dinleyicilerini kaldır
    });
    
    stopTimer(); // Zamanlayıcıyı duraklat
    attempts = 0; // Deneme sayacını sıfırla
    attemptsDisplay.textContent = `Attempts: ${attempts}`; // Deneme sayısını sıfırla
    messageContainer.textContent = 'Shuffling Cards'; // Mesajı göster
    
    setTimeout(() => {
        shuffleCard(); // Kartları karıştır
        startTimer(); // Yeni bir zamanlayıcı başlat
        messageContainer.textContent = ''; // Mesajı kaldır
        
        cards.forEach(card => {
            card.addEventListener("click", flipCard); // Kartlara yeniden tıklama dinleyicisi ekle
        });
    }, 3000); // 3 saniye bekle
}

// Başlangıçta kartları karıştır
shuffleCard();
// Zamanlayıcıyı başlat
startTimer();
// Deneme sayısını göster
attemptsDisplay.textContent = `Attempts: ${attempts}`;

// Tüm kartlara tıklama dinleyicisi ekle
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});



function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}