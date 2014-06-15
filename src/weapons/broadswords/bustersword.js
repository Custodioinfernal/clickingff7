class BusterSword extends BroadSword {

    constructor(game) {
        super(game);

        this.name = 'Buster Sword';

        this.hits = 18;

        this.price = 170;

        this.maxMaterias = 1;

        this.materias = [];

        this.available = function(x) {
            return (1 <= x);
        };
    }

}