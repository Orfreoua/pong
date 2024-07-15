// Récupération des éléments du DOM
const classicButton = document.getElementById('classicButton');
const boostedButton = document.getElementById('boostedButton');
const humanVsComputerButton = document.getElementById('humanVsComputerButton');
const humanVsHumanButton = document.getElementById('humanVsHumanButton');
const levelSelection = document.getElementById('levelSelection');
const easyLevelButton = document.getElementById('easyLevel');
const mediumLevelButton = document.getElementById('mediumLevel');
const hardLevelButton = document.getElementById('hardLevel');

let currentGameMode;
let humanVsHuman;

// Ajout des écouteurs d'événements aux boutons principaux
classicButton.addEventListener('click', function() {
    currentGameMode = 1;
    showSelectionOptions('Classic');
});

boostedButton.addEventListener('click', function() {
    showSelectionOptions('Boosted');
});

// Fonction pour afficher les options de sélection
function showSelectionOptions(gameMode) {
    // Masquer tous les boutons principaux
    classicButton.style.display = 'none';
    boostedButton.style.display = 'none';

    // Afficher les boutons d'options de sélection correspondants
    humanVsComputerButton.style.display = 'inline-block';
    humanVsHumanButton.style.display = 'inline-block';
}

// Ajout des écouteurs d'événements aux boutons d'options de sélection
humanVsComputerButton.addEventListener('click', function() {
    showLevelSelection();
});

humanVsHumanButton.addEventListener('click', function() {
    humanVsHuman = 1;
    console.log('Human vs Human mode selected.');
    document.getElementById('menu').style.display = 'none';//->ici je cache
    startMultiplayer();
});

// Fonction pour afficher la sélection de niveau
function showLevelSelection() {
    // Masquer les boutons d'options de sélection
    humanVsComputerButton.style.display = 'none';
    humanVsHumanButton.style.display = 'none';

    // Afficher la sélection de niveau
    levelSelection.style.display = 'block';
}

// Ajouter les écouteurs d'événements pour chaque niveau
easyLevelButton.addEventListener('click', function() {
    handleLevelSelection('Easy');
});

mediumLevelButton.addEventListener('click', function() {
    handleLevelSelection('Medium');
});

hardLevelButton.addEventListener('click', function() {
    handleLevelSelection('Hard');
});

// Fonction pour traiter la sélection de niveau
function handleLevelSelection(level) {
    console.log(`Selected ${level} level.`);
    startGame('Computer', level); // Démarrer le jeu avec l'adversaire de type Computer et le niveau sélectionné
}

// Fonction pour démarrer le jeu
function startGame(opponentType, level, gameMode) {
    // Masquer le menu
    document.getElementById('menu').style.display = 'none';
    
    if (opponentType === 'Computer') {
        // Initialiser le jeu contre l'ordinateur avec le niveau choisi
        //initGameAgainstComputer(level, gameMode);
    } else {
        // Initialiser le jeu multijoueur
       //initMultiplayerGame(gameMode);
    }
}

// Écouter l'événement de redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Mettre à jour la taille du canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});