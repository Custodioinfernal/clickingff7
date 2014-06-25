class Tifa extends Character {

    constructor(game, data) {
        super(game, data);

        // name of the character
        this.name = 'Tifa Lockhart';

        // character image
        this.image = '/img/characters/tifa.png';

        // character weapon type
        this.weaponType = 'knuckle';

        // STATS
        this.hpBase = 2;
        this.mpBase = 2;

        // Character XP formula
        this.xpFormula = function (x) {
            return Math.pow(x, 2) * 11;
        };

        // Character zones available
        this.available = function(x) {
              return (x !== 3);
        };

    }

}