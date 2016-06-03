import { Component } from 'angular2/core';
import { Meal } from './meal.model';

//Child of MealListComponent
@Component({
  selector: 'meal-display', //HTML tag rendering the View - details about individual clicked meal
  inputs: ['meal'], //will receive one meal from mealList to show
  template: `
    <h3 (click)="displayMeal()">{{ meal.name }}</h3>
    <div *ngIf="mealVisible">
      <p>Notes: {{meal.notes}}</p>
      <p>Calories: {{meal.calories}}</p>
    </div>
  `
})
export class MealComponent {
  public meal: Meal;
  public mealVisible: boolean = false;
  public displayMeal() {
    if (this.mealVisible == true) {
      this.mealVisible = false;
    } else {
      this.mealVisible = true;
    }; //displayMeal() toggles the meal details on/off based on click of meal.name
  }
}
