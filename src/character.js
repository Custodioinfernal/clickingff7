/**
 *
 */

class Character {

    constructor(game, data) {
        this.game = game;
        this.level = 1;
        this.xp = 0;
    }

    /**
     * Extends
     * @param data
     * @returns {Character}
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
        return this;
    }

    /*
     * @returns {*}
     */
    weapon() {
        return _.findWhere(this.game.weapons.list, {
            "type": this.weaponType,
            "equipped" : true
        });
    }

    /*
     * @returns {number}
     */
    getHpMax() {
        return Math.ceil((this.hpBase / 5) * 100 * this.level);
    }

    /*
     * @returns {number}
     */
    getMpMax() {
        return Math.ceil((this.mpBase / 5) * 10 * this.level);;
    }

    /*
     * @returns {number}
     */
    getHits() {
        return this.level * this.weapon().hits;
    }

    /*
     * @returns {Object}
     */
    getXpMax() {
        return this.xpFormula(this.level + 1);
    }

    /*
     * @param pixels_max
     * @returns {number}
     */
    xpProgress(pixels_max) {
        return (this.xp == 0 ? 0 : this.xp / this.getXpMax() * pixels_max);
    }

    /*
     * @param xp
     */
    setXp(xp) {
        this.xp += xp;
        while (this.xp >= this.getXpMax()) {
            this.xp -= this.getXpMax();
            this.level += 1;

            this.game.characters.refresh();
        }
    }

    /*
     * @returns {*}
     */
    getLine() {
        //var zoneLvlMax = this.Characters.game.zones.levelMax;
        //return this.Characters.game.data.lines[zoneLvlMax][this.ref];
    }

    /*
     * @returns {Object}
     */
    export() {
        var json = _.pick(this, 'inTeam', 'level', 'xp');
        json.model = this.constructor.name;
        return json;
    }
}