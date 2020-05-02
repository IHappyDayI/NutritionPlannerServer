import "../types/EUnits"

export class Ingredient {
    name: any;
    calcium: Nutrient;

    constructor(name: any) {
        this.name = name;
        this.calcium = new Nutrient("Calcium", 0, EUnits.Gram);
    }
}
