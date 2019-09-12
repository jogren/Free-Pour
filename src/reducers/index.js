import { combineReducers } from 'redux';
import { selectedDrink } from './selectedDrink';

const rootReducer = combineReducers({
  selectedDrink,
});

export default rootReducer;