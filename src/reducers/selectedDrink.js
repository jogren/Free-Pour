export const selectedDrink = (state = {}, action) => {
  switch(action.type) {
    case 'SHOW_SELECT_DRINK':
      return action.targetDrink;
    case 'HIDE_SELECTED_DRINK':
      return {}
    default:
      return state;
  }
}