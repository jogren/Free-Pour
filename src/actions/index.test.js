import { showSelectDrink, hideSelectedDrink, setCurrentCocktails, toggleFavorite } from './index';

describe('actions', () => {
  it('should return a showSelectDrink action object', () => {
    const mockDrinkObj = 
    { 
      id: 1, 
      name: 'Moscow Mule' 
    }

    const expected = {
      type: 'SHOW_SELECT_DRINK',
      targetDrink: mockDrinkObj
    }
    expect(showSelectDrink(mockDrinkObj)).toEqual(expected)
  });

  it('should return a hideSelectDrink action object', () => {
    const expected = {
      type: 'HIDE_SELECTED_DRINK'
    }
    expect(hideSelectedDrink()).toEqual(expected)
  });

  it('should return a currentCocktail action object', () => {
    const mockDrinkArray = [
      {
        id: 1,
        name: 'Moscow Mule'
      },
      {
        id: 2,
        name: 'Whiskey Sour'
      }
    ]

    const expected = {
      type: 'SET_CURRENT_COCKTAILS',
      cocktails: mockDrinkArray
    }
    expect(setCurrentCocktails(mockDrinkArray)).toEqual(expected)
  });

  it('should return a toggleFavorite action object', () => {
    const mockDrinkArray = [
      {
        id: 1,
        name: 'Moscow Mule'
      },
      {
        id: 2,
        name: 'Whiskey Sour'
      }
    ]

    const expected = {
      type: 'TOGGLE_FAVORITE',
      cocktails: mockDrinkArray
    }
    expect(toggleFavorite(mockDrinkArray)).toEqual(expected)
  });
})