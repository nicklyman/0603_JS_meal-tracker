import { Component } from 'angular2/core';
import { Meal } from './meal.model';

//Child of MealListComponent
@Component({
  selector: 'meal-display',//HTML tag rendering the View - details about individual clicked meal
  inputs: ['meal'],//will receive one meal from mealList to show
  template: `
    <h3>{{ meal.name }}</h3>
  `
})
export class MealComponent {
  public meal: Meal;
}
