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
        this.level = Math.ceil(level / 3);

        this._hpMax = Math.ceil(((this.hpMax - 3) * 10 / 100 + 1) * 25 * level);
        this._hits = Math.ceil(((this.hits - 3) * 10 / 100 + 1) * 1 * level);
        this._xp = Math.ceil(((this.xp - 3) * 10 / 100 + 1) * 10 * level);
        this._ap = Math.ceil(((this.ap - 3) * 10 / 100 + 1) * 2 * level);
        this._gils = Math.ceil(((this.gils - 3) * 10 / 100 + 1) * 5 * level);
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