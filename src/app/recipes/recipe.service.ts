import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    // recipeSelected = new EventEmitter<Recipe>();
    // recipeSelected = new Subject<Recipe>();

    recipesChanges = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Pav-Bhaji', 
    //         'a delicious food item!', 
    //         'https://media.istockphoto.com/id/638000936/photo/vegan-and-vegetarian-indian-cuisine-hot-spicy-dishes.jpg?s=612x612&w=is&k=20&c=yj8Jj4MM-9StXoHBCO36j1YQPa2an9IoaKBVrTZBllo=',
    //         [
    //             new Ingredient('pav', 2),
    //             new Ingredient('potatoes', 3)
    //         ]
    //     ),
    //     new Recipe(
    //         'Idli-Sambhar', 
    //         'A great traditional Bhartiya food', 
    //         'https://media.istockphoto.com/id/638000936/photo/vegan-and-vegetarian-indian-cuisine-hot-spicy-dishes.jpg?s=612x612&w=is&k=20&c=yj8Jj4MM-9StXoHBCO36j1YQPa2an9IoaKBVrTZBllo=',
    //         [
    //             new Ingredient('Idli', 2),
    //             new Ingredient('Sambhar', 3)
    //         ]
    //     )
    // ];

    constructor(private shoppingService: ShoppingService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanges.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingService.addRecipeIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanges.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanges.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanges.next(this.recipes.slice());
    }
}