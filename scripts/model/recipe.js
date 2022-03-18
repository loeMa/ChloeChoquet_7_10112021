export class recipeClass {
    constructor(data){
        
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }

    get ingredient() {
        return this._ingredients.ingredient
    }
    get quantity() {
        return this._ingredients.quantity
    }
    get unit() {
        return this._ingredients.unit
    }
    get title() {
        return this._name
    }
    get duration() {
        return this._time
    }
    get description() {
        return this._description
    }
    get appliance() {
        return this._appliance
    }
    get ustensils() {
        return this._ustensils
    }
    
    
} 
