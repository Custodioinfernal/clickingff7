class Chapter {

    /**
     *
     * @param game
     */
    constructor(game) {
        this.game = game;

        // Extract number of the chapter from the class name
        this.number = parseInt(this.constructor.name.substring(7));

        // build zones
        for(var zone of this.zones) {
            this.game.zones.add(new window['Zone' + zone](this.game), true);
        }
    }

}