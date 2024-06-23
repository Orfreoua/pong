document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById('customTextContainer');

    // Texte à ajouter
    var text = "Pong";

    // Créer un élément de texte
    var textElement = document.createElement('p');
    textElement.textContent = text;
    textElement.classList.add('neon-text');

    // Ajouter l'élément de texte au conteneur
    container.appendChild(textElement);
});
