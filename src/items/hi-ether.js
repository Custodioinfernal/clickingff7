class HiEther extends Item {

    constructor(game) {
        super(game);

        this.name = 'Hi-Ether';

        this.price = 1200;

        this.available = function(x) {
            return x >= 7;
        };
    }

    /**
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.characters.mp < this.game.characters.mpMax);
    }

    /**
     * Use potion
     */
        action() {
        var that = this;

        super.action(function () {
            that.game.characters.addMp(100);
        });
    }

}