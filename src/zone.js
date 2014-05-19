/**
 * Zone class
 * @param {Zones} Zones
 * @param {Object} data
 */

class Zone {

    constructor(Zones, data) {

        this._id = _.uniqueId();

        this.Zones = Zones;

        if (data) {
            this.extend(data);
        }
        if (!_.has(this, 'completed')) {
            this.completed = false;
        }
    }

    /**
     * Extends the data properties with saved data
     * @param  {Object} data
     */
        extend(data) {
        for (var i in data) {
            this[i] = data[i];
        }
    }

    /**
     * Go to the zone
     */
        go() {
        this.Zones.level = this.level;
    }

    /**
     * Returns true if player is on this level
     * @return {Boolean}
     */
        here() {
        return (this.level == this.Zones.level);
    }

    /**
     * Save zone data
     */
        save() {
        var json = _.pick(this, 'ref', 'completed');

        return json;
    }

}

