class Potion extends Item {

    constructor(game) {
        super(game);

        this.name = 'Potion'.toUpperCase();

        this.heal = 150;
    }

    /**
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.characters.hp < this.game.characters.hpMax);
    }

    /**
     * Use potion
     */
        action() {
        var that = this;

        super.action(function () {
            that.game.characters.addHp(that.heal);
        });
    }

}