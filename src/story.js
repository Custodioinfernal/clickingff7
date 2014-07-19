class Story {

    /**
     *
     * @param game
     */
        constructor(game) {
        this.game = game;

        // previous and current chapters
        this.chapters = [];

        // current chapter
        this.chapter = null;
    }

    /**
     * Load previous and current chapters
     * @param chapterNumber
     */
        load(chapterNumber) {
        this.chapterNumber = chapterNumber;
        for (var i = 1; i <= chapterNumber; i++) {
            var chapter = new window['Chapter' + i](this.game);
            this.chapters.push(chapter);
            if (i === chapterNumber) {
                this.chapter = chapter;
            }
        }
    }

    /**
     * Load a new chapter chapter
     */
        loadNew(chapterNumber) {
        var chapter = new window['Chapter' + chapterNumber](this.game);
        this.chapters.push(chapter);
        this.chapter = chapter;
        this.chapter.load();
    }

    /**
     *
     * @returns {{chapterNumber: (*|.export.chapterNumber)}}
     */
        export() {
        return {chapterNumber: this.chapter.number};
    }

}