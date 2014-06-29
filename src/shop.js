class Shop {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;

        this.section = 'buy';
        this.type = 'weapons';
    }

    refresh() {
        this.weapons = [];
        this.materias = [];
        this.items = [];

        var weapons = [
            'BusterSword',
            'GatlingGun',
            'AssaultGun',
            'LeatherGlove',
            'MetalKnuckle',
            'GuardStick',
            'MythrilRod'
        ];
        for (var w of weapons) {
            var weapon = new window[w](this.game);
            if (weapon.available(this.game.zones.levelMax)) {
                this.weapons.push(weapon);
            }
        }

        var materias = [
            'Restore',
            'Bolt'
        ];
        for (var m of materias) {
            var materia = new window[m](this.game);
            if (materia.available(this.game.zones.levelMax)) {
                this.materias.push(materia);
            }
        }

        var items = [
            'Potion',
            'Ether'
        ];
        for (var i of items) {
            var item = new window[i](this.game);
            if (item.available(this.game.zones.levelMax)) {
                this.items.push(item);
            }
        }
    }


}