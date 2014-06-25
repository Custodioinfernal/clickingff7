class GatlingGun extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Gatling Gun';

        this.type = 'gun-arm';

        this.hits = 14;

        this.price = 130;

        this.maxMaterias = 1;

        this.available = function(x) {
            return (1 <= x);
        };
    }

}