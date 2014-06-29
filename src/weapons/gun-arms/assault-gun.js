class AssaultGun extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Assault Gun';

        this.type = 'gun-arm';

        this.hits = 17;

        this.price = 350;

        this.maxMaterias = 1;

        this.available = function(x) {
            return (2 <= x);
        };
    }

}