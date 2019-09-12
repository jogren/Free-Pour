export const showSelectDrink = targetDrink => ({
  type: 'SHOW_SELECT_DRINK',
  targetDrink
});

export const hideSelectedDrink = () => ({
  type: 'HIDE_SELECTED_DRINK'
});

export const setCurrentCocktails = cocktails => ({
  type: 'SET_CURRENT_COCKTAILS',
  cocktails
});