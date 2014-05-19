/**
 * Zones class
 * @param {object} Game
 */

class Zones {

    constructor(Game) {

        this._id = _.uniqueId();

        this.Game = Game;

        this.zones = [];

        this.level = 1;

        this.levelMax = 1;
    }

    /**
     * Build zones
     */
        build() {
        for (var i in this.Game.data.zones) {
            var data = _.clone(this.Game.data.zones[i]);
            this.zones.push(new Zone(this, data));
        }

        // Max of zones
        this.max = Object.keys(this.Game.data.zones).length;
    }

    /**
     * Returne all the discovered zones
     * @return {[type]} [description]
     */
        getAll() {
        var zoneLvlMax = this.levelMax;
        return _.filter(this.zones, function (o) {
            return (o.level <= zoneLvlMax);
        });
    }

    /**
     * Complete the current level zone
     */
        completed() {
        this.zone().completed = true;
        if (this.level < this.max) {
            this.level++;
            this.levelMax++;
            this.Game.newItems();
            this.Game.characters.refresh();
        }
    }

    /**
     * Go to a level zone
     * @param  {int} level
     */
        zone(level) {
        return _.findWhere(this.zones, {
            level: this.level
        });
    }

    /**
     * Save zones data
     */
        save() {
        var json = _.pick(this, 'level', 'levelMax');

        json.data = [];
        for (var i in this.zones) {
            if (this.zones[i].level <= this.levelMax) {
                json.data.push(this.zones[i].save());
            }
        }

        return json;
    }

}