import { Pipe, PipeTransform } from 'angular2/core';
import { Meal } from './meal.model';

@Pipe({
  name: "mealQuality",
  pure: false
})
export class MealQualityPipe implements PipeTransform {
  transform(mealList: Meal[], args) {
    var userSelection = args[0];
    if(userSelection === "healthy") {
      return mealList.filter((meal) => {
        return meal.calories < 500;
      });
    } else if (userSelection === "unhealthy") {
      return mealList.filter((meal) => {
        return meal.calories >= 500;
      });
    } else {
      return mealList;
    }
  }
}
