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
}