import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from './Nav';

describe('Nav', () => {
  let wrapper;
  const mockGetCocktailsByGenre = jest.fn();
  const mockSetCurrentCocktails = jest.fn();
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
    wrapper = shallow(<Nav 
      getCocktailsByGenre={mockGetCocktailsByGenre}
      favoriteCocktails={mockFavoriteCocktails}
      setCurrentCocktails={mockSetCurrentCocktails}
    />);
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update search state onChange of input', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 'margarita', name: 'search' } });
    expect(wrapper.state('search')).toEqual('margarita')
    expect(wrapper.state('searchHasErrored')).toEqual('')
  })
})