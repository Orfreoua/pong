document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const audio = new Audio('assets/dotamain.mp3');
    let isPlaying = false; // Variable pour suivre l'état de la lecture audio

    playButton.addEventListener('click', function() {
        if (!isPlaying) {
            audio.play().then(() => {
                console.log('La musique est en train de jouer');
                isPlaying = true; // Met à jour l'état de lecture
                playButton.textContent = '🔇'; // Change le texte du bouton
            }).catch(error => {
                console.error('Erreur de lecture audio :', error);
            });
        } else {
            audio.pause(); // Met en pause la musique
            isPlaying = false; // Met à jour l'état de lecture
            playButton.textContent = '🔈'; // Change le texte du bouton
        }
    });
});
