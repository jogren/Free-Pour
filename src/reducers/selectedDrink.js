export const selectedDrink = (state = {}, action) => {
  switch(action.type) {
    case 'SELECT_DRINK':
      return action.targetDrink;
    default:
      return state;
  }
}