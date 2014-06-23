/**
 * Zones class
 * @param {object} Game
 */

class Zones {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.list = [];
        this.max = 2; // todo auto find max available zones
    }

    /**
     * Add a zone
     * @param zone
     */
        add(zone, go) {
        if ((this.level = zone.level) > this.levelMax || !this.levelMax) {
            this.levelMax = this.level;
        }
        this.list.push(zone);
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


    getOthers() {
        var level = this.level;
        return _.filter(this.list, function(o) {
            return (o.level !== level);
        })
    }

    /**
     * Complete the current level zone
     */
        completed() {
        this.current().completed = true;
        if (this.level < this.max) {
            this.level++;
            this.levelMax++;
            this.game.buildLevel(this.levelMax);
        }
    }

    /**
     * Get the current zone
     * @returns {*}
     */
        current() {
        return _.findWhere(this.list, {
            level: this.level
        });
    }

    /**
     * Save zones data
     */
        export() {
        var json = _.pick(this, 'level', 'levelMax');

        json.list = [];
        for (var i in this.list) {
            if (this.list[i].level <= this.levelMax) {
                json.list.push(this.list[i].export());
            }
        }

        return json;
    }

}