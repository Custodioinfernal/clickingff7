class MetalKnuckle extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Metal Knuckle';

        this.type = 'knuckle';

        this.hits = 18;

        this.price = 320;

        this.maxMaterias = 1;

        this.available = function(x) {
            return (3 <= x);
        };
    }

}