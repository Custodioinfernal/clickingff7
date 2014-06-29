class Aerith extends Character {

    constructor(game, data) {
        super(game, data);

        // name of the character
        this.name = 'Aerith Gainsborough';

        // character image
        this.image = '/img/characters/aerith.jpg';

        // character weapon type
        this.weaponType = 'stave';

        // STATS
        this.level = 8;
        this.hpBase = 1;
        this.mpBase = 5;

        // Character XP formula
        this.xpFormula = function (x) {
            return Math.pow(x, 2) * 17;
        };

        // Character zones available
        this.notA = [4, 5];

    }

}