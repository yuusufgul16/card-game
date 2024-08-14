// Skorları yerel depolamadan al
function getHighScores() {
    let scores = localStorage.getItem('highScores');
    return scores ? JSON.parse(scores) : [];
}

// Skoru kaydet
function saveScore(score) {
    let scores = getHighScores();
    scores.push(score);
    scores.sort((a, b) => a.attempts - b.attempts || a.time - b.time); // Önce denemelere göre, sonra zamana göre sıralar
    scores = scores.slice(0, 5); // Sadece en iyi 5 skoru tut
    localStorage.setItem('highScores', JSON.stringify(scores));
}

// High Score tablosunu güncelle
function updateHighScores() {
    let scores = getHighScores();
    let scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = '';

    scores.forEach((score, index) => {
        let li = document.createElement('li');
        li.textContent = ` ${index + 1}. Attempts:${score.attempts} - Time: ${score.time}`;
        scoreList.appendChild(li);
    });
}




// Oyun bittiğinde skoru kaydet ve high score tablosunu güncelle
function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 8) {
            setTimeout(() => {
                stopTimer(); // Zamanlayıcıyı duraklat
                let finalTime = timerDisplay.textContent;
                let finalScore = { attempts: attempts, time: finalTime };
                saveScore(finalScore);
                updateHighScores();
                messageContainer.textContent = `TCongratulations! You have matched all the cards.  Number of attempts: ${attempts}`;
                setTimeout(() => restartGame(), 3000); // 3 saniye sonra oyunu yeniden başlat
            }, 1000); // 1 saniye animasyon süresi
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        disableDeck = false; 
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 300);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = null;
            disableDeck = false; 
        }, 1000);
    }
}


// Sayfa yüklendiğinde high score tablosunu güncelle
document.addEventListener('DOMContentLoaded', updateHighScores);


document.getElementById('resetHighScoresButton').addEventListener('click', () => {
    // High score verilerini localStorage'dan sil
    localStorage.removeItem('highScores');
    
    // High score listesini temizle
    document.getElementById('scoreList').innerHTML = '';
});
