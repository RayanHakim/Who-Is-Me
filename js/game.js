const GameLogic = {
    rolePool: [],
    players: [],
    totalRequiredPlayers: 0,
    currentRegisterIndex: 0,
    isGameOver: false,

    prepareRoles(counts) {
        this.rolePool = [];
        this.players = [];
        this.currentRegisterIndex = 0;
        this.isGameOver = false;
        this.totalRequiredPlayers = counts.civilian + counts.undercover + counts.white;

        const selectedPair = StorageManager.getRandomPair();
        
        // LOGIK BARU: Mengacak penentuan kata mana yang dipasangkan ke Civilian / Undercover
        let civilianWord, undercoverWord;
        if (Math.random() > 0.5) {
            civilianWord = selectedPair.wordA;
            undercoverWord = selectedPair.wordB;
        } else {
            civilianWord = selectedPair.wordB;
            undercoverWord = selectedPair.wordA;
        }

        for (let i = 0; i < counts.civilian; i++) this.rolePool.push({ role: 'Civilian', word: civilianWord });
        for (let i = 0; i < counts.undercover; i++) this.rolePool.push({ role: 'Undercover', word: undercoverWord });
        for (let i = 0; i < counts.white; i++) this.rolePool.push({ role: 'Mr. White', word: '???' });

        // Fisher-Yates Shuffle urutan peran pemain
        for (let i = this.rolePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.rolePool[i], this.rolePool[j]] = [this.rolePool[j], this.rolePool[i]];
        }
    },

    registerNextPlayer(name) {
        const assignedRole = this.rolePool[this.currentRegisterIndex];
        const newPlayer = {
            name: name,
            role: assignedRole.role,
            word: assignedRole.word,
            isAlive: true
        };
        this.players.push(newPlayer);
        this.currentRegisterIndex++;
        return newPlayer;
    },

    isRegisterFinished() {
        return this.currentRegisterIndex >= this.totalRequiredPlayers;
    },

    eliminatePlayer(index) {
        if (this.players[index] && !this.isGameOver) {
            this.players[index].isAlive = false;
            return this.players[index];
        }
        return null;
    },

    checkGameResult() {
        let aliveCivilian = 0;
        let aliveUndercover = 0;
        let aliveWhite = 0;

        this.players.forEach(p => {
            if (p.isAlive) {
                if (p.role === 'Civilian') aliveCivilian++;
                if (p.role === 'Undercover') aliveUndercover++;
                if (p.role === 'Mr. White') aliveWhite++;
            }
        });

        const totalAlive = aliveCivilian + aliveUndercover + aliveWhite;

        if (aliveWhite > 0 && totalAlive <= 2) {
            this.isGameOver = true;
            return {
                finished: true,
                winner: "Mr. White",
                detail: "Mr. White berhasil menyamar sampai akhir tanpa tertebak!"
            };
        }

        if (aliveUndercover >= aliveCivilian && aliveWhite === 0) {
            this.isGameOver = true;
            return {
                finished: true,
                winner: "Undercover",
                detail: "Jumlah Undercover menyamai atau melebihi Civilian. Penyusupan berhasil!"
            };
        }

        if (aliveUndercover === 0 && aliveWhite === 0) {
            this.isGameOver = true;
            return {
                finished: true,
                winner: "Civilian",
                detail: "Selamat! Semua Undercover dan Mr. White telah berhasil dieliminasi."
            };
        }

        return { finished: false };
    }
};