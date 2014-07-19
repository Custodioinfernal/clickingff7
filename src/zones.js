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
     */
        add(zone) {
        this.list.push(zone);
    }

    /**
     *
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