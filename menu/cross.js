document.getElementById('exitButton').addEventListener('click', function() {
    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.style.display = 'flex';
});

document.getElementById('yesButton').addEventListener('click', function() {
    window.location.reload();
    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.style.display = 'none';
    gameCanvas.style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
});

document.getElementById('noButton').addEventListener('click', function() {
    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.style.display = 'none';
});