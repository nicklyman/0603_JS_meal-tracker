import { Component, EventEmitter } from 'angular2/core';
import { MealComponent } from './meal.component';
import { Meal } from './meal.model';

//Child of AppComponent, Parent of MealComponent
@Component({
  selector: 'meal-list',//HTML tag rendering the View - list of meals
  inputs: ['mealList'],//creates list of meals from 'my-app'
  outputs: ['onMealSelect'],//output selected meal to parent 'my-app' after click event
  directives: [MealComponent],//parent of MealComponent
  template: `
    <meal-display *ngFor="#currentMeal of mealList"
      (click)="mealClicked(currentMeal)"
      [class.selected]="currentMeal === selectedMeal"
      [meal]="currentMeal">
    </meal-display>
  `
  //MealListComponent displays a list of meals and when a meal is clicked/selected, that event is emitted to the parent and that meal name is highlighted
  //<meal-display> connects the MealComponent to the MealListComponent
})
export class MealListComponent {
  public mealList: Meal[];//array of meals
  public onMealSelect: EventEmitter<Meal>;//creating a property to hold the EventEmitter object for our output when the event is triggered
  public selectedMeal: Meal;//variable to keep track of which meal was clicked on
  constructor() {
    this.onMealSelect = new EventEmitter();//instantiating the EventEmitter object
  }
  mealClicked(clickedMeal: Meal): void {
    this.selectedMeal = clickedMeal;//variable is set when a click event is received and triggers mealClicked method to run
    this.onMealSelect.emit(clickedMeal);//when a meal is clicked, this method emits the selected meal to 'my-app'
  }
}
