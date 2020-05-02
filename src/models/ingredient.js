const Nutrient = require('./nutrient');

class Ingredient {
    constructor(name) {
        this.name = name;
        this.calcium = new Nutrient("Calcium", 0, "g");
    }
}

module.exports = Ingredient