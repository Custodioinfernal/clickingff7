class Zone {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;

        // ref for export
        this.ref = this.constructor.name;

        // extract number of the zone from the class name
        this.number = parseInt(this.constructor.name.substring(4));

        // number of fights in the zone
        this.nbFights = 0;

        // true if the zone is available
        this.available = true;

        // true if the player is at the zone
        this.current = false;

        // true if the zone is selected in map section
        this.selected = false;
    }

    /**
     * Extends
     * @param data
     * @returns {Zone}
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
        return this;
    }

    /**
     * Save zone data
     */
        export() {
        var json = _.pick(this, 'ref', 'nbFights', 'available');

        if (this.current) json.current = true;
        if (this.selected) json.selected = true;

        return json;
    }

}

