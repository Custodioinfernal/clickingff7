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

}