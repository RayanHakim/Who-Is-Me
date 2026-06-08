document.addEventListener("DOMContentLoaded", () => {
    StorageManager.init();

    const setupScreen = document.getElementById("setup-screen");
    const registerScreen = document.getElementById("register-screen");
    const gameplayScreen = document.getElementById("gameplay-screen");

    const countCivilian = document.getElementById("count-civilian");
    const countUndercover = document.getElementById("count-undercover");
    const countWhite = document.getElementById("count-white");

    const registerTurnTitle = document.getElementById("register-turn-title");
    const currentPlayerName = document.getElementById("current-player-name");
    const wordDisplayBox = document.getElementById("word-display-box");
    const secretWordText = document.getElementById("secret-word-text");
    const btnActionRegister = document.getElementById("btn-action-register");
    const playerCardsGrid = document.getElementById("player-cards-grid");

    // Elemen Baru Untuk Daftar Kata
    const btnToggleWords = document.getElementById("btn-toggle-words");
    const wordsListContainer = document.getElementById("words-list-container");
    const wordsListView = document.getElementById("words-list-view");

    let isShowingWordState = false;

    // Aksi Tombol Tampilkan/Sembunyikan Kata Database
    btnToggleWords.addEventListener("click", () => {
        if (wordsListContainer.classList.contains("hidden")) {
            const allWords = StorageManager.getWords();
            wordsListView.innerHTML = "";
            allWords.forEach((pair, index) => {
                const li = document.createElement("li");
                li.textContent = `${index + 1}. ${pair.wordA} - ${pair.wordB}`;
                wordsListView.appendChild(li);
            });
            wordsListContainer.classList.remove("hidden");
            btnToggleWords.textContent = "Sembunyikan Daftar Kata";
        } else {
            wordsListContainer.classList.add("hidden");
            btnToggleWords.textContent = "Lihat Semua Daftar Kata";
        }
    });

    document.getElementById("btn-add-word").addEventListener("click", () => {
        const civ = document.getElementById("custom-civilian-word").value.trim();
        const und = document.getElementById("custom-undercover-word").value.trim();

        if (civ && und) {
            StorageManager.addWordPair(civ, und);
            alert("Kata kustom berhasil ditambahkan!");
            document.getElementById("custom-civilian-word").value = "";
            document.getElementById("custom-undercover-word").value = "";
            
            // Force refresh list jika sedang dibuka
            if (!wordsListContainer.classList.contains("hidden")) {
                wordsListContainer.classList.add("hidden");
                btnToggleWords.click();
            }
        } else {
            alert("Mohon isi kedua kolom kata.");
        }
    });

    document.getElementById("btn-start-setup").addEventListener("click", () => {
        const civCount = parseInt(countCivilian.value) || 0;
        const undCount = parseInt(countUndercover.value) || 0;
        const whiteCount = parseInt(countWhite.value) || 0;

        if (civCount < 1) {
            alert("Minimal harus ada 1 Civilian.");
            return;
        }

        GameLogic.prepareRoles({ civilian: civCount, undercover: undCount, white: whiteCount });
        
        isShowingWordState = false;
        resetRegisterForm();
        showScreen(registerScreen);
    });

    btnActionRegister.addEventListener("click", () => {
        if (!isShowingWordState) {
            const name = currentPlayerName.value.trim();
            if (!name) {
                alert("Silakan isi nama Anda terlebih dahulu.");
                return;
            }

            const player = GameLogic.registerNextPlayer(name);
            secretWordText.textContent = player.word;
            
            currentPlayerName.style.display = "none";
            wordDisplayBox.classList.remove("hidden");
            
            if (GameLogic.isRegisterFinished()) {
                btnActionRegister.textContent = "Mulai Masuk Game";
            } else {
                btnActionRegister.textContent = "Sudah Lihat, Oper HP ke Pemain Berikutnya";
            }
            isShowingWordState = true;
        } else {
            if (GameLogic.isRegisterFinished()) {
                showScreen(gameplayScreen);
                renderGameplayCards();
            } else {
                isShowingWordState = false;
                resetRegisterForm();
            }
        }
    });

    document.getElementById("btn-restart").addEventListener("click", () => {
        document.getElementById("game-status-box").classList.add("hidden");
        document.getElementById("game-instruction-card").classList.remove("hidden");
        
        // Sembunyikan kontainer kata saat reset game
        wordsListContainer.classList.add("hidden");
        btnToggleWords.textContent = "Lihat Semua Daftar Kata";

        showScreen(setupScreen);
    });

    function showScreen(screen) {
        [setupScreen, registerScreen, gameplayScreen].forEach(s => s.classList.add("hidden"));
        screen.classList.remove("hidden");
    }

    function resetRegisterForm() {
        registerTurnTitle.textContent = `Pemain Ke-${GameLogic.currentRegisterIndex + 1}`;
        currentPlayerName.value = "";
        currentPlayerName.style.display = "block";
        wordDisplayBox.classList.add("hidden");
        btnActionRegister.textContent = "Konfirmasi Nama";
    }

    function renderGameplayCards() {
        playerCardsGrid.innerHTML = "";
        GameLogic.players.forEach((player, index) => {
            const card = document.createElement("div");
            card.className = "player-card";
            card.id = `p-card-${index}`;

            card.innerHTML = `
                <div class="card-player-name">${player.name}</div>
                <div id="reveal-area-${index}">
                    <button class="btn-eliminate" onclick="handleEliminate(${index})">Eliminasi</button>
                </div>
            `;
            playerCardsGrid.appendChild(card);
        });
    }

    window.handleEliminate = (index) => {
        if (GameLogic.isGameOver) return;

        const p = GameLogic.eliminatePlayer(index);
        if (p) {
            const cardEl = document.getElementById(`p-card-${index}`);
            const revealArea = document.getElementById(`reveal-area-${index}`);
            
            cardEl.classList.add("eliminated");
            revealArea.innerHTML = `
                <div class="role-reveal">${p.role}</div>
                <div class="word-reveal">Kata: ${p.word}</div>
            `;

            const result = GameLogic.checkGameResult();
            if (result.finished) {
                const statusBox = document.getElementById("game-status-box");
                const instructionCard = document.getElementById("game-instruction-card");
                const winnerTitle = document.getElementById("game-winner-title");
                const winnerDetail = document.getElementById("game-winner-detail");

                winnerTitle.textContent = `${result.winner} Menang!`;
                winnerDetail.textContent = result.detail;
                
                statusBox.classList.remove("hidden");
                instructionCard.classList.add("hidden");

                const allButtons = document.querySelectorAll(".btn-eliminate");
                allButtons.forEach(btn => btn.disabled = true);
            }
        }
    };
});