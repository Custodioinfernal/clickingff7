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

        var hpMax = this.game.zones.level * 100;
        var hits = this.game.zones.level;
        var xp = this.game.zones.level * 5;
        var ap = this.game.zones.level * 2;
        var gils = this.game.zones.level * 10;

        this._hpMax = Math.ceil(this.hpMax / 5 * hpMax);
        this._hits = Math.ceil(this.hits / 5 * hits);
        this._xp = Math.ceil(this.xp / 5 * xp);
        this._ap = Math.ceil(this.ap / 5 * ap);
        this._gils = Math.ceil(this.gils / 5 * gils);
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