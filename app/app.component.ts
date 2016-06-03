import { Component } from 'angular2/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>Meal Tracker</h1>
      <h3 *ngFor="#meal of meals" (click)="mealWasSelected(meal)">
        {{ meal.name }}
      </h3>
    </div>
  `
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
    console.log(clickedMeal);
  }
}

export class Meal {
  constructor(public name: string, public description: string, public calories: number, public id: number) {

  }
}
