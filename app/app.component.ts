import { Component, EventEmitter } from 'angular2/core';
import { MealListComponent } from './meal-list.component';
import { Meal } from './meal.model';

//Trunk class, Child is MealListComponent
@Component({
  selector: 'my-app',//HTML tag
  directives: [MealListComponent],//tells the parent the name of it's child component where it will be receiving event emissions from
  template: `
    <div class="container">
      <h1>Meal Tracker</h1>
      <meal-list
        [mealList]="meals"
        (onMealSelect)="mealWasSelected($event)">
      </meal-list>
    </div>
  `
})
  //in <meal-list> the value from the parent property (AppComponent) "meals" is put into the child component's (MealListComponent) [mealList] property to be displayed - [] = input to component
  //<meal-list> also connects the output (onMealSelect) - custom EventEmitter, to the parent method mealWasSelected($event) - () = output from component
  //($event) recieves the clicked meal from the 'meal-list' and that meal.name is highlighted

export class AppComponent {
  public meals: Meal[];//array of meals
  constructor() {
    this.meals = [
      new Meal("Bagel and cream cheese", "Light cream cheese", 410, 0),
      new Meal("Hamburger", "Added bacon and mushrooms", 775, 1),
      new Meal("Gin and juice", "Grapefruit juice", 300, 2),
      new Meal("Salad", "Fresh vegetables from the garden", 330, 3),
      new Meal("Banana split", "Worth every bite!", 900, 4),
      new Meal("Hot dogs", "Ate more than 50, but it was a contest!", 19800, 5)
    ];
  }
  mealWasSelected(clickedMeal: Meal): void {
  }//method takes the clickedMeal parameter and is triggered when a meal is clicked, but doesn't return anything (void)
}
