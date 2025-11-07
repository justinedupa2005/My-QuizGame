const leaderBoardContainer = document.getElementById('leaderBoardContainer');
const topPlayerContainer = document.createElement('div');
const topPlayer = document.createElement('div');

// THIS NEEDS IF playersCount < 0 then it wont display a container

topPlayerContainer.className = 'topPlayer-Container';
topPlayer.className = 'leaderboard-top-player';

leaderBoardContainer.appendChild(topPlayerContainer);
topPlayerContainer.appendChild(topPlayer);





