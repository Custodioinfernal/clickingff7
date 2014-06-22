class GatlingGun extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Gatling Gun';

        this.type = 'gun-arm';

        this.hits = 1;

        this.price = 130;

        this.maxMaterias = 1;

        this.materias = [];

        this.available = function(x) {
            return (1 <= x);
        };
    }

}