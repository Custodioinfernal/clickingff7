class Story {

    /**
     *
     * @param game
     */
        constructor(game) {
        this.game = game;

        // current chapter object
        this.chapter = null;
    }

    /**
     *
     * @param chapterNumber
     */
        load(chapterNumber) {
        this.chapter = new window['Chapter' + chapterNumber](this.game);
        this.chapter.load();
    }

    /**
     *
     * @returns {{chapterNumber: *}}
     */
        export() {
        return {chapterNumber: this.chapter.number};
    }

}