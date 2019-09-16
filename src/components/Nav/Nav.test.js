import React from 'react';
import { shallow } from 'enzyme';
import { Nav, mapDispatchToProps } from './Nav';
import { fetchCocktailsBySearch } from '../../apiCalls/apiCalls';
import { setCurrentCocktails } from '../../actions';

jest.mock('../../apiCalls/apiCalls');

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

  describe('getCocktailsBySearch', () => {
    it('should invoke fetchCocktailsBySearch', () => {
      wrapper.instance().getCocktailsBySearch();

      expect(fetchCocktailsBySearch).toHaveBeenCalled()
    })

    it('should invoke setCurrentCocktails if fetch is resolved and searchedCocktails is not null', () => {
      fetchCocktailsBySearch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      wrapper.instance().getCocktailsBySearch();
      expect(mockSetCurrentCocktails).toHaveBeenCalled()
      expect(wrapper.state('search')).toEqual('')
    });

    it('should reset the search state', () => {
      fetchCocktailsBySearch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      wrapper.instance().getCocktailsBySearch();
      expect(wrapper.state('search')).toEqual('')
    });

    it('should return catch error if promise rejects (SAD)', () => {
      fetchCocktailsBySearch.mockImplementation(() => {
        return Promise.reject({
          message: 'Server is down'
        })
      });
      expect(wrapper.instance().getCocktailsBySearch()).rejects.toEqual(Error('Server is down'));
    });

    it('should invoke getCocktailsByGenre onChange of select', () => {
      const mockEvent = { target: { value: 'vodka' }};
      wrapper.find('select').simulate('change', mockEvent);
      expect(mockGetCocktailsByGenre).toHaveBeenCalledWith('vodka');;
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
  });
})