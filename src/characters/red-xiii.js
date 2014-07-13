class RedXIII extends Character {

    constructor(game, data) {
        super(game, data);

        // name of the character
        this.name = 'Red XIII';

        // character image
        this.image = '/img/characters/redxiii.jpg';

        // character weapon type
        this.weaponType = 'headdresse';

        // STATS
        this.level = 16;
        this.hpBase = 2;
        this.mpBase = 4;
        this.xpBase = 4;

        // Character XP formula
        this.xpFormula = function (x) {
            return Math.pow(x, 2) * 14;
        };

        // Character zones available
        this.notA = [];

    }

}