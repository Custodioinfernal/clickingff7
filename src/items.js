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
     * Add an item
     * @param item
     * @param equipped
     */
        add(item, equipped) {
        item.equipped = equipped;
        this.list.push(item);
    }

    /**
     * Returns equipped items
     * @returns {Array}
     */
        getEquipped() {
        return _.where(this.list, {equipped: true});
    }

    /**
     * Export all items
     * @returns {Array}
     */
        export() {
        var json = [], i, t;
        for (i in this.list) {
            json.push(this.list[i].export());
        }
        return json;
    }
}