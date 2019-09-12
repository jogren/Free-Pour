import { combineReducers } from 'redux';
import { toggleSelectedDrink } from './selectedDrink';

const rootReducer = combineReducers({
  toggleSelectedDrink,
});

export default rootReducer;