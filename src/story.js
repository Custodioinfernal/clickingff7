class Story {

    /**
     *
     * @param game
     */
    constructor(game) {
        this.game = game;

        this.step = 1;
    }

    /**
     *
     * @param data
     * @returns {Story}
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
        return this;
    }

    /**
     * @returns {Object}
     */
        export() {
        return _.pick(this, 'step');
    }

}