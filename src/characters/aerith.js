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
        this.level = 6;
        this.hpBase = 1;
        this.mpBase = 5;
        this.xpBase = 2;

        // Character zones available
        this.notA = [4, 5];

    }

}