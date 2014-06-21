class Weapons {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.list = [];
    }

    /**
     * Add a weapon
     * @param weapon
     */
        add(weapon, equipped) {
        weapon.equipped = equipped;
        this.list.push(weapon);
    }

    /**
     * Returns maximum materias that can be equipped
     * @returns {number}
     */
    maxMaterias() {
        var maxMaterias = 0;

        var weapons = _.where(this.list, {
            equipped: true
        });
        for (var e of weapons) {
            maxMaterias += e.maxMaterias;
        }

        return maxMaterias;
    }

    /**
     * Export all weapons
     * @returns {Array}
     */
        export() {
        var json = [], i, t;
        for(i in this.list) {
            json.push(this.list[i].export());
        }
        return json;
    }
}