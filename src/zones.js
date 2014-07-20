class Zones {

    /**
     *
     * @param game
     */
        constructor(game) {
        this.game = game;

        // list of zones
        this.list = [];

        // current zone
        this.current = null;

        // selected zone in map section
        this.selected = null;
    }

    /**
     *
     * @param zone
     * @param refresh
     */
        add(zone, refresh) {
        this.list.push(zone);

        if (refresh) {
            zone.available = true;
            zone.current = true;
            zone.selected = true;
            this.refresh();
        }
    }

    /**
     * Defines current & selected zone
     * @returns {Zones}
     */
        refresh() {
        this.current = _.find(this.list, {current: true});
        this.selected = _.find(this.list, {selected: true});
    }

    /**
     *
     * @returns {Object}
     */
        export() {
        var json = [];

        for (var zone of this.list) {
            json.push(zone.export());
        }

        return json;
    }

}