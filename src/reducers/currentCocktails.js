export const currentCocktails = (state = [], action) => {
  switch(action.type) {
    case 'SET_CURRENT_COCKTAILS':
      return action.cocktails;
    default:
      return state;
  }
}