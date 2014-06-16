class GatlingGun extends GunArm {

    constructor(game) {
        super(game);

        this.name = 'Gatling Gun';

        this.hits = 14;

        this.price = 130;

        this.maxMaterias = 1;

        this.materias = [];

        this.available = function(x) {
            return (1 <= x);
        };
    }

}