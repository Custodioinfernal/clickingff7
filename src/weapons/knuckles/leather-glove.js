class LeatherGlove extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Leather Glove';

        this.type = 'knuckle';

        this.hits = 13;

        this.price = 120;

        this.maxMaterias = 1;

        this.available = function(x) {
            return (2 <= x);
        };
    }

}