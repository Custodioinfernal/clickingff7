class Chapter {

    /**
     *
     * @param game
     */
        constructor(game) {
        this.game = game;

        // Extract number of the chapter from the class name
        this.number = parseInt(this.constructor.name.substring(7));
    }

    /**
     * Mark the zones as available or not
     */
        load() {
        var zones = this.game.zones.list;

        // mark the zones as available or not
        for (var zone of zones) {
            zone.available = (_.indexOf(this.availableZones, zone.number) > 0);
        }

        // add new zones
        var newZone = false;
        for (var zoneNumber of this.newZones) {

            // add new zone
            var zone = new window['Zone' + zoneNumber](this.game);
            this.game.zones.add(zone);

            // set current (and selected) the zone
            if (!newZone) {
                zone.current = true;
                zone.selected = true;
                this.game.zones.refresh();
                newZone = true;
            }
        }


    }

}