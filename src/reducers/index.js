import { combineReducers } from 'redux';
import { selectedDrink } from './selectedDrink';
import { currentCocktails } from './currentCocktails';

const rootReducer = combineReducers({
  selectedDrink,
  currentCocktails
});

export default rootReducer;