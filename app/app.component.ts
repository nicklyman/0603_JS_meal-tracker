import { Component, EventEmitter } from 'angular2/core';

//Child of AppComponent
@Component({
  selector: 'meal-list',
  inputs: ['mealList'],//gets list of meals from 'my-app'
  outputs: ['onMealSelect'],//output selected meal to parent 'my-app'
  template: `
    <h3 *ngFor="#currentMeal of mealList"
      (click)="mealClicked(currentMeal)"
      [class.selected]="currentMeal === selectedMeal">
      {{ currentMeal.name }}
    </h3>
  `
})
export class MealListComponent {
  public mealList: Meal[];
  public onMealSelect: EventEmitter<Meal>;
  public selectedMeal: Meal;
  constructor() {
    this.onMealSelect = new EventEmitter();
  }
  mealClicked(clickedMeal: Meal): void {
    this.selectedMeal = clickedMeal;
    this.onMealSelect.emit(clickedMeal);//When a meal is clicked, this method emits the selected meal to 'my-app'
  }
}

//Parent class - child is MealListComponent
@Component({
  selector: 'my-app',
  directives: [MealListComponent],
  template: `
    <div class="container">
      <h1>Meal Tracker</h1>
      <meal-list
        [mealList]="meals"
        (onMealSelect)="mealWasSelected($event)">
      </meal-list>
    </div>
  `//($event) recieves the clicked meal from the 'meal-list' and that meal.name is highlighted
})
export class AppComponent {
  public meals: Meal[];
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

export class Meal {
  constructor(public name: string, public description: string, public calories: number, public id: number) {

  }
}
