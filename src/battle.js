class Battle {

    constructor(game) {
        this.game = game;
        this.isBattle = false;
    }

    /**
     * Characters start auto-attacking
     */
        start() {
        if (!this.isBattle) {
            this.isBattle = true;

            this.game.characters.autoFighting();

            this.game.enemies.random();
            this.game.enemies.refresh();
            this.game.enemies.autoFighting();
        }
    }

    /**
     * Characters stop attacking and wait for next fight
     * @param  {boolean} victory
     */
        end(victory) {
        this.isBattle = false;

        this.game.characters.stopFighting();
        this.game.enemies.stopFighting();

        var enemies = this.game.enemies.list;
        var characters = this.game.characters.getTeam();

        for (var i in enemies) {
            var enemy = enemies[i];

            // Rewards if victory
            if (victory) {
                this.game.gils += enemy.gilsReward();

                if (enemy.boss && this.game.zones.level + 1 > this.game.zones.levelMax) {
                    // Complete zone
                    this.game.zones.completed();
                }

                // XP for characters, AP for materias
                for (var j in characters) {
                    var character = characters[j];
                    var xp = enemy.xpReward();
                    var ap = enemy.apReward();
                    character.setXp(xp);
                }
            }
        }

        this.game.enemies.remove();
        this.game.enemies.refresh();
        this.game.characters.refresh();
    }
}