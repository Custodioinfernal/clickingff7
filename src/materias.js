class Materias {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.list = [];
    }

    /**
     * Add a materia
     * @param materia
     */
        add(materia, equipped) {
        materia.equipped = equipped;
        this.list.push(materia);
    }

    /**
     * Returns equipped materias
     * @returns {Array}
     */
    getEquipped() {
        return _.where(this.list, {
            equipped: true
        });
    }
}