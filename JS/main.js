let singlePlayerMode = document.getElementById('singlePlayerBtn');
let multiPlayerMode = document.getElementById('multiplayerBtn');

if(singlePlayerMode) {
    singlePlayerMode.addEventListener('click', function(){
        sessionStorage.setItem('gameMode', 'single');
        window.location.href = "categories.html";
        console.log("Single Player");
    })
}

if(multiPlayerMode) {
    multiPlayerMode.addEventListener('click', function(){
        sessionStorage.setItem('gameMode', "multiplayer");
        window.location.href = "categories.html";
    })
}
