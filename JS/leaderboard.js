import { GetLeaderboard } from "../JS/firebaseAuth.js";

const leaderBoardContainer = document.getElementById("leaderBoardContainer");

const loadLeaderboard = async () => {
    console.log("=== LEADERBOARD DEBUG START ===");
    console.log("leaderBoardContainer found?", leaderBoardContainer);
    
    try {
        console.log("Calling GetLeaderboard()...");
        const players = await GetLeaderboard();
        
        console.log("Raw players data:", players);
        console.log("Number of players:", players.length);
        console.log("Players array:", JSON.stringify(players, null, 2));

        if (players.length === 0) {
            console.log("❌ No players found in leaderboard.");
            const noDataMsg = document.createElement("div");
            noDataMsg.className = "text-white text-xl mt-10";
            noDataMsg.textContent = "No players yet. Be the first!";
            leaderBoardContainer.appendChild(noDataMsg);
            return;
        }

        let rank = 1;

        players.forEach(player => {
            console.log(`Adding rank ${rank}: ${player.username} - ${player.score} points`);
            
            const row = document.createElement("div");
            row.className = "topPlayer-Container";

            row.innerHTML = `
                <p class="leaderboard-top-player w-[25%] border-r-4 border-white">${rank}</p>
                <p class="leaderboard-top-player w-[45%]">${player.username}</p>
                <p class="leaderboard-top-player w-[30%] border-l-4 border-white">${player.score}</p>
            `;

            leaderBoardContainer.appendChild(row);
            rank++;
        });
        
        console.log("✅ Leaderboard loaded successfully!");
        
    } catch (error) {
        console.error("❌ ERROR loading leaderboard:", error);
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
    }
    
    console.log("=== LEADERBOARD DEBUG END ===");
};

loadLeaderboard();