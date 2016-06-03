import { Component, EventEmitter } from 'angular2/core';

//Child of MealListComponent

//Child of AppComponent, Parent of MealComponent
@Component({
  selector: 'meal-list',//HTML tag
  inputs: ['mealList'],//gets list of meals from 'my-app'
  outputs: ['onMealSelect'],//output selected meal to parent 'my-app' after click event
  template: `
    <h3 *ngFor="#currentMeal of mealList"
      (click)="mealClicked(currentMeal)"
      [class.selected]="currentMeal === selectedMeal">
      {{ currentMeal.name }}
    </h3>
  `
  //MealListComponent displays a list of meals and when a meal is clicked/selected, that event is emitted to the parent and that meal name is highlighted
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
  //in <meal-list> the value from the parent property (AppComponent) "meals" is put into the child component's (MealListComponent) [mealList] property to be displayed - [] = input to component
  //<meal-list> also connects the output (onMealSelect) - custom EventEmitter, to the parent method mealWasSelected($event) - () = output from component
  //($event) recieves the clicked meal from the 'meal-list' and that meal.name is highlighted
})
export class AppComponent {
  public meals: Meal[];//array of meals
  constructor() {
    this.meals = [
      new Meal("Bagel and cream cheese", "Light cream cheese", 410, 0),
      new Meal("Hamburger", "Added bacon and mushrooms", 775, 1),
      new Meal("Gin and juice", "Grapefruit juice", 300, 2),
      new Meal("Salad", "Fresh vegetables from the garden", 330, 3),
      new Meal("Banana split", "Worth every bite!", 900, 4)
    ];
  }
  mealWasSelected(clickedMeal: Meal): void {
  }
}

//Meal model - contains the framework for our Meal objects
export class Meal {
  constructor(public name: string, public description: string, public calories: number, public id: number) {
  }
}
