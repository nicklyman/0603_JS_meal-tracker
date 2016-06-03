import { Pipe, PipeTransform } from 'angular2/core';
import { Meal } from './meal.model';

//Allows user to select meals based on filtering criteria
@Pipe({
  name: "mealQuality",
  pure: false //makes the pipe "stateful", allowing it to change the contents of the meal list
})

export class MealQualityPipe implements PipeTransform {
  transform(mealList: Meal[], args) { //transform method takes an array of meals and an array of arguments
    var userSelection = args[0]; //user only needs to see all meals, healthy meals, or unhealthy meals, so there is only one argument needed [0]
    if(userSelection === "healthy") { //"healthy" option selected and the pipe filters out any meals that do not meet the criteria and only displays the meals with fewer than 500 calories
      return mealList.filter((meal) => {
        return meal.calories < 500;
      });
    } else if (userSelection === "unhealthy") { //"unhealthy" option selected and the pipe filters out any meals that do not meet the criteria and only displays the meals with 500 calories or more
      return mealList.filter((meal) => {
        return meal.calories >= 500;
      });
    } else if (userSelection === "reallyUnhealthy") { //"reallyUnhealthy" option selected and the pipe filters out any meals that do not meet the criteria and only displays the meals with 10,000 calories or more
      return mealList.filter((meal) => {
        return meal.calories >= 10000;
      });
    } else {
      return mealList; //equivalent to "all" option since there is no filtering criteria and all meals are displayed to the user
    }
  }
}
