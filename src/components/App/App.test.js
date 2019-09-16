import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { fetchPopularCocktails, fetchCocktailsByGenre } from '../../apiCalls/apiCalls';
import { setCurrentCocktails, hideSelectedDrink } from '../../actions';

jest.mock('../../apiCalls/apiCalls');

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

  describe('componentDidMount', () => {
    it('should call fetchPopularCocktails and mockSetCurrentCocktails after mounting', () => {
      expect(fetchPopularCocktails).toHaveBeenCalled();
      expect(mockSetCurrentCocktails).toHaveBeenCalled();
    })
  })

  describe('getCocktailsByGenre', () => {
    it('should call fetchPopularCocktails and setCurrentCocktails with correct argument after calling getCocktailsByGenre with a type popular', () => {
      wrapper.instance().getCocktailsByGenre('popular');
      expect(fetchPopularCocktails).toHaveBeenCalled();
      expect(mockSetCurrentCocktails).toHaveBeenCalled();
    })
  
    it('should return catch error if promise rejects and type is popular (SAD)', () => {
      fetchPopularCocktails.mockImplementation(() => {
        return Promise.reject({
          message: 'Server is down'
        })
      });
      expect(wrapper.instance().getCocktailsByGenre('popular')).rejects.toEqual(Error('Server is down'));
    });
  
    it('should call fetchCocktailsByGenre and setCurrentCocktails with correct argument after calling getCocktailsByGenre with a type not popular', () => {
      wrapper.instance().getCocktailsByGenre('vodka');
      expect(fetchCocktailsByGenre).toHaveBeenCalled();
      expect(mockSetCurrentCocktails).toHaveBeenCalled();
    })
  
    it('should return catch error if promise rejects and type is not popular (SAD)', () => {
      fetchPopularCocktails.mockImplementation(() => {
        return Promise.reject({
          message: 'Server is down'
        })
      });
      expect(wrapper.instance().getCocktailsByGenre('vodka')).rejects.toEqual(Error('Server is down'));
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with all properties of the store', () => {
      const mockState = {
        selectedDrink: mockSelectedDrink,
        currentCocktails: mockCurrentCocktails,
        favoriteCocktails: mockFavoriteCocktails
      };

      const expected = {
        selectedDrink: mockSelectedDrink,
        currentCocktails: mockCurrentCocktails,
        favoriteCocktails: mockFavoriteCocktails
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with an setCurrentCocktails action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentCocktails([{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }]);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentCocktails([{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }]);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with an hideSelectedDrink action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = hideSelectedDrink();

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.hideSelectedDrink();

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
})