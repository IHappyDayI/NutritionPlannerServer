export class Recipe {
    name: any;
    ingredient: any;
    description: any;
    workflow: any;
    
    constructor(name: string, ingredient: any, description: string, workflow: any) {
        this.name = name;
        this.ingredient = ingredient;
        this.description = description;
        this.workflow = workflow;
    }
}