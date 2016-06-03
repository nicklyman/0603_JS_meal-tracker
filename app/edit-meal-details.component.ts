import { Component } from 'angular2/core';
import { Meal } from './meal.model';

//Child of MealListComponent and master-detail interface for editing details of a meal from the list of meals
@Component({
  selector: 'edit-meal-details',
  inputs: ['meal'], //the meal that will be edited
  template: `
    <div class="meal-form" id="edit-meals">
      <h3>Edit a Meal:</h3>
      <label>Name: </label>
      <input [(ngModel)]="meal.name"><br>
      <label>Notes: </label>
      <input [(ngModel)]="meal.notes"><br>
      <label>Calories: </label>
      <input [(ngModel)]="meal.calories">
    </div>
  `
})
  //above are the fields that are available for editing

export class EditMealDetailsComponent {
  public meal: Meal;
}
