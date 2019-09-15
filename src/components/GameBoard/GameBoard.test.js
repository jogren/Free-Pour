import React from 'react';
import { shallow } from 'enzyme';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {
  let wrapper;
  const mockToggleFavorite = jest.fn();
  const mockFavoriteCocktails = [
    {
      name: 'Moscow Mules',
      glass: 'Copper Mug',
      instructions: 'Combine ingredients...',
      image: 'image2.png',
      ingredients: [
        {
          guessed: false,
          ingredient: 'Vodka',
          measure: '2-3 oz'
        },
        {
          guessed: false,
          ingredient: 'Ginger Ale',
          measure: '5oz'
        },
        {
          guessed: false,
          ingredient: 'Lime Juice',
          measure: '2tbsp'
        }
      ]
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<GameBoard 
      favoriteCocktails={mockFavoriteCocktails}
      toggleFavorite={mockToggleFavorite}
    />)
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });
})