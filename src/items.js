class Items {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.list = [];
    }

    /**
     * Add a item
     * @param i
     */
        add(i) {
        this.list.push(i);
    }
}