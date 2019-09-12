import { combineReducers } from 'redux';
import { selectedDrink } from './selectedDrink';
import { currentCocktails } from './currentCocktails';
import { favoriteCocktails } from './favoriteCocktails';

const rootReducer = combineReducers({
  selectedDrink,
  currentCocktails,
  favoriteCocktails
});

export default rootReducer;