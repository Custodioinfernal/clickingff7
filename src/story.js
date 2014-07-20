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
        this.current = null;

        // selected chapter
        this.selected = null;
    }

    /**
     * Load a new chapter
     * @param chapter
     * @param load
     */
        add(chapter, load = false) {
        this.chapters.push(chapter);

        if (load) {
            chapter.load();

            // automatic refresh
            this.refresh();
        }
    }

    /**
     *
     */
        refresh() {
        // last chapter
        this.lastChapter = _.last(this.chapters);

        // current
        this.current = _.find(this.chapters, {current: true});

        // default current
        if (!this.current) {
            this.current = this.lastChapter;
        }

        // selected
        this.selected = _.find(this.chapters, {selected: true});

        // default selected
        if (!this.selected) {
            this.selected = this.lastChapter;
        }
    }

    /**
     *
     * @returns {Array}
     */
        export() {
        var json = [];
        for (var chapter of this.chapters) {
            json.push(chapter.export());
        }
        return json;
    }

}