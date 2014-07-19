class Battle {

    constructor(game) {
        this.game = game;
        this.isBattle = false;
    }

    /**
     * Characters start auto-attacking
     */
        fight() {
        if (!this.isBattle) {
            this.isBattle = true;

            this.game.enemies.fightRandom();
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

        this.game.enemies.stopFighting();

        var enemies = this.game.enemies.list;
        var characters = this.game.characters.getTeam();
        var materias = this.game.materias.getEquipped();

        for (var enemy of enemies) {

            // Rewards if victory
            if (victory) {
                this.game.gils += enemy.gilsReward();

                if (enemy.boss) {
                    // Complete zone
                    this.game.story.success();
                }

                // XP for characters
                var xp = enemy.xpReward();
                for (var character of characters) {
                    character.setXp(xp);
                }

                // AP for materias
                var ap = enemy.apReward();
                for (var materia of materias) {
                    materia.setAp(ap);
                }

                this.game.story.nbFights++;
            }
        }

        this.game.enemies.remove();
        this.game.enemies.refresh();
        this.game.characters.refresh();
    }
}