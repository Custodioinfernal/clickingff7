class Chapter {

    /**
     *
     * @param game
     */
        constructor(game) {
        this.game = game;

        // model's name for export
        this.ref = this.constructor.name;

        // Extract number of the chapter from the class name
        this.number = parseInt(this.constructor.name.substring(7));
    }

    /**
     * Mark the zones as available or not
     */
        load() {
        var zones = this.game.zones.list;

        // mark the existing zones as available or not
        for (var zone of zones) {
            zone.available = (_.indexOf(this.availableZones, zone.number) > 0);
            delete zone.current;
            delete zone.selected;
        }

        // add new zone (default: available)
        this.game.zones.add(new window['Zone' + this.number](this.game), true);

    }

    export() {
        return _.pick(this, 'ref');
    }

}