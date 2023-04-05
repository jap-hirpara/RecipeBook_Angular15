import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService){

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            'https://angularlearning-dc49e-default-rtdb.asia-southeast1.firebasedatabase.app/response.json'
            , recipes
        ).subscribe(
            response => {
                console.log(response);                
            }
        );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(
            'https://angularlearning-dc49e-default-rtdb.asia-southeast1.firebasedatabase.app/response.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);                 
                console.log(recipes);
            })
        );
    }

    // fetchRecipes(){
    //     return this.http.get<Recipe[]>(
    //         'https://angularlearning-dc49e-default-rtdb.asia-southeast1.firebasedatabase.app/response.json'
    //     ).pipe(
    //         map(recipes => {
    //             return recipes.map(recipe => {
    //                 return {
    //                     ...recipe,
    //                     ingredients: recipe.ingredients ? recipe.ingredients : []
    //                 };
    //             });
    //         }),
    //         tap(recipes => {
    //             this.recipeService.setRecipes(recipes);                 
    //             console.log(recipes);
    //         })
    //     )
    // }

    // fetchRecipes(){
    //     return this.authService.user.pipe(
    //         take(1),
    //         exhaustMap(user => {
    //             return this.http.get<Recipe[]>(
    //                 'https://angularlearning-dc49e-default-rtdb.asia-southeast1.firebasedatabase.app/response.json',
    //                 {
    //                     params: new HttpParams().set('auth', user.token)
    //                 }
    //             );
    //         }),
    //         map(recipes => {
    //             return recipes.map(recipe => {
    //                 return {
    //                     ...recipe,
    //                     ingredients: recipe.ingredients ? recipe.ingredients : []
    //                 };
    //             });
    //         }),
    //         tap(recipes => {
    //             this.recipeService.setRecipes(recipes);                 
    //             console.log(recipes);
    //         })
    //     );
    // }
}


// https://console.firebase.google.com/project/angularlearning-dc49e/database/angularlearning-dc49e-default-rtdb/data/~2F