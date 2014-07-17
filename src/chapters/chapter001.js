class Chapter1 extends Chapter {

    constructor(game) {
        super(game);
    }

    load() {
        // add cloud in the team
        this.characters.add(new Cloud(this).load(data), true);
        this.weapons.add(new BusterSword(this), true);

        // add barret in the team
        this.characters.add(new Barret(this).load(data), true);
        this.weapons.add(new GatlingGun(this), true);

        // add materias
        this.materias.add(new Restore(this), true);
        this.materias.add(new Bolt(this), true);

        // add items
        this.items.add(new Potion(this), true);
        this.items.add(new Potion(this), true);
    }

    success() {

    }

    fail() {

    }

}