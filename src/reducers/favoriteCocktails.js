export const favoriteCocktails = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_FAVORITE':
      return action.cocktails;
    default:
      return state;
  }
}