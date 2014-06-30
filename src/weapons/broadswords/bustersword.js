class BusterSword extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Buster Sword';

        this.type = 'broadsword';

        this.hits = 1800;

        this.price = 170;

        this.maxMaterias = 1;

        this.available = function(x) {
            return (1 <= x);
        };
    }

}