import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App';

describe('App', () => {
  let wrapper;
  const mockHideSelectedDrink = jest.fn();
  const mockSetCurrentCocktails = jest.fn();

  const mockSelectedDrink = { 
    name: 'Mojito', 
    glass: 'Highball glass', 
    instructions: 'Muddle mint leaves...', 
    image: 'image.png', 
    ingredients: [
      {
        guessed: false,
        ingredient: 'Light rum',
        measure: '2-3 oz' 
      },
      {
        guessed: false,
        ingredient: 'mint',
        measure: 'leaves'
      },
      {
        guessed: false,
        ingredient: 'sugar',
        measure: '2tbsp'
      }
    ]
  }

  const mockCurrentCocktails = [
    {
      strDrink: 'Mojito',
      strDrinkThumb: 'image.png'
    },
    {
      strDrink: 'Moscow Mule',
      strDrinkThumb: 'image2.png'
    }
  ]

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
    wrapper = shallow(<App 
      selectedDrink={mockSelectedDrink}
      currentCocktails={mockCurrentCocktails}
      favoriteCocktails={mockFavoriteCocktails}
      hideSelectedDrink={mockHideSelectedDrink}
      setCurrentCocktails={mockSetCurrentCocktails}
    />);
  });

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should return an object with selectedDrink, currentCocktails, favoriteCocktails', () => {
    const mockState = {
      selectedDrink: { id: 1, name: 'Moscow Mules' },
      currentCocktails: [
        { 
          id: 1, 
          name: 'Moscow Mule'
        },
        {
          id: 2,
          name: 'Mojito'
        }
      ],
      favoriteCocktails: [
        {
          id: 1,
          name: 'Moscow Mule'
        }
      ]
    };
    const expected = {
      selectedDrink: { id: 1, name: 'Moscow Mules' },
      currentCocktails: [
        {
          id: 1,
          name: 'Moscow Mule'
        },
        {
          id: 2,
          name: 'Mojito'
        }
      ],
      favoriteCocktails: [
        {
          id: 1,
          name: 'Moscow Mule'
        }
      ]
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
})
