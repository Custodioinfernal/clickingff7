class Enemy {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
    }

    /**
     * Get the enemy to the given level
     * @param level
     * @private
     */
        _toLevel(level) {
        this.level = level;

        var coeff = 1;
        if (this.miboss) coeff = 1.5;
        if (this.boss) coeff = 2;

        this._hpMax = coeff * Math.ceil(((this.hpMax - 2) * 10 / 100 + 1) * 50 * level);
        this._hits = coeff * Math.ceil(((this.hits - 2) * 10 / 100 + 1) * 2 * level);
        this._xp = coeff * Math.ceil(((this.xp - 2) * 10 / 100 + 1) * 5 * level);
        this._ap = coeff * Math.ceil(((this.ap - 2) * 10 / 100 + 1) * 2 * level);
        this._gils = coeff * Math.ceil(((this.gils - 2) * 10 / 100 + 1) * 10 * level);
    }

    /**
     * Returns enemy HP
     * @return {int}
     */
        getHpMax() {
        return this._hpMax;
    }

    /**
     * Returns enemy pwr
     * @return {int}
     */
        getHits() {
        return this._hits;
    }

    /**
     * returns enemy XP reward
     * @return {int}
     */
        xpReward() {
        return this._xp;
    }

    /**
     * returns enemy AP reward
     * @return {int}
     */
        apReward() {
        return this._ap;
    }

    /**
     * returns enemy gils reward
     * @return {int}
     */
        gilsReward() {
        return this._gils;
    }

    /**
     * Save enemy data
     */
        export() {
        return _.omit(this, 'image', 'name');
    }

}