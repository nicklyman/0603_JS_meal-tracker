import { Component, EventEmitter } from 'angular2/core';
import { MealComponent } from './meal.component';
import { Meal } from './meal.model';
import { EditMealDetailsComponent } from './edit-meal-details.component';
import { NewMealComponent } from './new-meal.component';
import { MealQualityPipe } from './MealQuality.pipe';

//Child of AppComponent, Parent of MealComponent
@Component({
  selector: 'meal-list',//HTML tag rendering the View - list of meals
  inputs: ['mealList'],//creates list of meals from 'my-app'
  outputs: ['onMealSelect'],//output selected meal to parent 'my-app' after click event
  directives: [MealComponent, EditMealDetailsComponent, NewMealComponent],//MealListComponent is parent of directives
  pipes: [MealQualityPipe],
  template: `
    <select (change)="onChange($event.target.value)">
      <option value="all" selected="selected">Show All Meals</option>
      <option value="healthy">Show Meals With Fewer Than 500 Calories</option>
      <option value="unhealthy">Show Unhealthy Meals With 500 or More Calories</option>
    </select>
    <meal-display *ngFor="#currentMeal of mealList | mealQuality:filterMealQuality"
      (click)="mealClicked(currentMeal)"
      [class.selected]="currentMeal === selectedMeal"
      [meal]="currentMeal">
    </meal-display>
    <edit-meal-details *ngIf="selectedMeal" [meal]="selectedMeal">
    </edit-meal-details>
    <new-meal (onSubmitNewMeal)="addMeal($event)"></new-meal>
  `
})
  //MealListComponent displays a list of meals and when a meal is clicked/selected, that event is emitted to the parent and that meal name is highlighted
  //<> selector tags connect the directives to the MealListComponent

export class MealListComponent {
  public mealList: Meal[];//array of meals
  public onMealSelect: EventEmitter<Meal>;//creating a property to hold the EventEmitter object for our output when the event is triggered
  public selectedMeal: Meal;//variable to keep track of which meal was clicked on
  public filterMealQuality: string = "all";
  constructor() {
    this.onMealSelect = new EventEmitter();//instantiating the EventEmitter object
  }
  mealClicked(clickedMeal: Meal): void {
    this.selectedMeal = clickedMeal;//variable is set when a click event is received and triggers mealClicked method to run
    this.onMealSelect.emit(clickedMeal);//when a meal is clicked, this method emits the selected meal to 'my-app'
  }
  addMeal(newMeal: Meal): void {
    newMeal.id = this.mealList.length;
    this.mealList.push(newMeal);
  }
  onChange(filterOption) {
    this.filterMealQuality = filterOption;
  }
}
