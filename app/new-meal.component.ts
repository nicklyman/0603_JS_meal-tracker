import {Component, EventEmitter} from 'angular2/core';
import {Meal} from './meal.model';

//Child of MealListComponent
@Component({
  selector: 'new-meal',
  outputs: ['onSubmitNewMeal'],
  template: `
    <div class="meal-form">
      <h3>Add meal:</h3>
      <input placeholder="meal name" #newMealName>
      <input placeholder="meal notes" #newMealNotes>
      <input placeholder="meal calories" #newMealCalories>
      <button (click)="addMeal(newMealName, newMealNotes, newMealCalories)" class="btn-danger add-button">Add Meal</button>
    </div>
  `
})
  //user can add a new meal and after the button is clicked, the meal is emitted through the addMeal() to the MealListComponent, appending to the list of meals
  
export class NewMealComponent {
  public onSubmitNewMeal: EventEmitter<Meal>;
  constructor() {
    this.onSubmitNewMeal = new EventEmitter();
  }
  addMeal(addedMealName: HTMLInputElement, addedMealNotes: HTMLInputElement, addedMealCalories: HTMLInputElement) {
    var newMeal = new Meal (addedMealName.value, addedMealNotes.value, parseInt(addedMealCalories.value), 0);

    console.log(newMeal);
    this.onSubmitNewMeal.emit(newMeal);
    addedMealName.value = "";//clears the input field after button click
    addedMealNotes.value = "";
    addedMealCalories.value = "";
  }
}
