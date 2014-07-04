class MythrilSaber extends Weapon {

    constructor(game) {
        super(game);

        this.name = 'Mythril Saber';

        this.type = 'broadsword';

        this.hits = 23;

        this.price = 1000;

        this.maxMaterias = 1;

        this.available = function(x) {
            return (7 <= x);
        };
    }

}