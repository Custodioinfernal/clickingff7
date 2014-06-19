class Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        this.game = game;

        if (!_.has(this, 'completed')) {
            this.completed = false;
        }
    }

    /**
     * Extends the data properties with saved data
     * @param  {Object} data
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
    }

    /**
     * Go to the zone
     */
        go() {
        this.Zones.level = this.level;
    }

    /**
     * Returns true if player is on this level
     * @return {Boolean}
     */
        here() {
        return (this.level == this.Zones.level);
    }

    /**
     * Save zone data
     */
        export() {
        var json = _.pick(this, 'completed');
        json.model = this.constructor.name;
        return json;
    }

}

