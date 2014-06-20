class Materia {

    constructor(game) {
        this.game = game;
        this.level = 1;
        this.ap = 0;
    }

    /**
     * Extends
     * @param data
     * @returns {Materia}
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
        return this;
    }

    /**
     * Executes materia action
     * @param fn
     */
    action(fn) {
        this.game.characters.stopFighting();
        fn();
        this.game.characters.autoFighting();
    }

    /*
     * @returns {string}
     */
    getDesc() {
        var Txt = '';

        switch (this.ref) {
            case 'restore':
                Txt = 'HP +' + (this.level * 2) + '% while restoring';
                break;
            case 'bolt':
                Txt = 'Bolt damages +' + (this.level * 10) + '%';
                break;
            case 'ice':
                Txt = 'Ice damages +' + (this.level * 10) + '%';
                break;
            case 'fire':
                Txt = 'Fire damages +' + (this.level * 10) + '%';
                break;
            case 'poison':
                Txt = 'Poison damages +' + (this.level * 10) + '%';
                break;
            case 'earth':
                Txt = 'Earth damages +' + (this.level * 10) + '%';
                break;
        }

        return Txt;
    }

    /*
     * @returns {*}
     */
    getLevel() {
        if (this.level < this.levelMax) {
            return this.level;
        } else {
            return "MAX";
        }
    }

    /*
     * @returns {Object}
     */
    getApMax() {
        return eval(this.ap_formula.replace('x', this.level));
    }

    /*
     * @returns {game.gils|*|number|save.gils}
     */
    getPrice() {
        return this.gils;
    }

    /*
     * @returns {Number}
     */
    inStock() {
        var materias = _.where(this.game.materias, {
            ref: this.ref
        });
        return materias.length;
    }

    /*
     * @param pixels_max
     * @returns {number}
     */
    apProgress(pixels_max) {
        return (this.ap == 0 ? 0 : this.ap / this.getApMax() * pixels_max);
    }

    /*
     * @param ap
     */
    setAp(ap) {
        this.ap += ap;
        while (this.ap >= this.getApMax() && this.level < this.levelMax) {
            this.ap -= this.getApMax();
            this.level += 1;
        }
    }

    /*
     * @param characterRef
     */
    equip(characterRef) {
        this.character = characterRef;
        this.game.characters.refresh();
    }

    /*
     *
     */
    unequip() {
        this.character = "";
        this.game.characters.refresh();
    }

    /**
     * @returns {Object}
     */
        export() {
        var json = _.pick(this, 'ap', 'level', 'equipped');
        json.model = this.constructor.name;
        return json;
    }

}