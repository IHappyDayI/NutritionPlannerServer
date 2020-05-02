class Nutrient {
    name: any;
    value: any;
    unit: any;

    constructor(name: string, value: number, unit: EUnits) {
        this.name = name;
        this.value = value;
        this.unit = unit;
    }
}
