class Enemy {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
    }

    /**
     * Returns enemy HP
     * @return {int}
     */
        getHpMax() {
        var level = this.level;
        var zoneLvl = this.game.zones.level;
        var hits = [12.8, 38.4, 62.4, 84.8, 154, 223.2, 324.8];
        var characters_hits = hits[zoneLvl - 1];
        var res;

        if (this.boss) {
            res = characters_hits * 20;
        } else if (this.miboss) {
            res = characters_hits * 17.5;
        } else {
            res = Math.ceil((level / (zoneLvl * 4)) * characters_hits * 15);
        }

        return res;
    }

    /**
     * Returns enemy pwr
     * @return {int}
     */
        getHits() {
        var level = this.level;
        var zoneLvl = this.game.zones.level;
        var hp = [120, 344, 468, 688, 1200, 1728, 2016];
        var characters_hp = hp[zoneLvl - 1];
        var res;

        if (this.boss) {
            res = Math.ceil(characters_hp / 9);
        } else if (this.miboss) {
            res = Math.ceil(characters_hp / 10.5);
        } else {
            res = Math.ceil((level / (zoneLvl * 4)) * characters_hp / 12);
        }

        return res;
    }

    /**
     * returns enemy XP reward
     * @return {int}
     */
        xpReward() {
        var res = this.level * 10;
        if (this.miboss) {
            res *= 1.5;
        }
        if (this.boss) {
            res *= 2;
        }
        return res;
    }

    /**
     * returns enemy AP reward
     * @return {int}
     */
        apReward() {
        var zoneLvl = this.game.zones.level;
        var res = Math.ceil(this.level + zoneLvl);
        if (this.miboss) {
            res *= 1.5;
        }
        if (this.boss) {
            res *= 2;
        }
        return res;
    }

    /**
     * returns enemy gils reward
     * @return {int}
     */
        gilsReward() {
        var zoneLvl = this.game.zones.level;
        var res = Math.ceil(this.level * 10 + zoneLvl);
        if (this.miboss) {
            res *= 1.5;
        }
        if (this.boss) {
            res *= 2;
        }
        return res;
    }

    /**
     * Save enemy data
     */
        export() {
        return _.omit(this, 'image', 'name');
    }

}