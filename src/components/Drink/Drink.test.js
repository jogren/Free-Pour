import React from 'react';
import { shallow } from 'enzyme';
import { Drink, mapStateToProps, mapDispatchToProps } from './Drink';
import { fetchMoreDrinkInfo } from '../../apiCalls/apiCalls';

import { showSelectDrink, toggleFavorite } from '../../actions';

jest.mock('../../apiCalls/apiCalls');

describe('Drink', () => {
  let wrapper;
  const mockShowSelectDrink = jest.fn();
  const mockToggleFavorite = jest.fn();
  const mockFavoriteCocktails = [
    {
      name: 'Moscow Mule',
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
    wrapper = shallow(<Drink 
      image='image.png'
      name='Mojito'
      showSelectDrink={mockShowSelectDrink}
      toggleFavorite={mockToggleFavorite}
      favoriteCocktails={mockFavoriteCocktails}
    />)
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleShowMore', () => {
    it('should invoke handleShowMore when the button is clicked', () => {
      wrapper.instance().handleShowMore = jest.fn();
      wrapper.instance().forceUpdate();

      wrapper.find('button').simulate('click');
      expect(wrapper.instance().handleShowMore).toHaveBeenCalled()
    })

    it('should invoke fetchMoreDrinkInfo and showSelectedDrink when handleShowMore is invoked', async () => {
      await wrapper.instance().handleShowMore();

      expect(fetchMoreDrinkInfo).toHaveBeenCalled();
      expect(mockShowSelectDrink).toHaveBeenCalled();
    })
  })

  describe('toggleFavorite', () => {
    it('should invoke toggleFavorite when the label is clicked', () => {
      wrapper.instance().toggleFavorite = jest.fn();
      wrapper.instance().forceUpdate();
    
      wrapper.find('label').simulate('click');
      expect(wrapper.instance().toggleFavorite).toHaveBeenCalled()
    })

    it('should invoke fetchMoreDrinkInfo with the correct drink name', () => {
      wrapper.instance().toggleFavorite({ name: 'Moscow Mule' })
      expect(fetchMoreDrinkInfo).toHaveBeenCalledWith('Moscow Mule')
    })
  })

  describe('toggleFavoriteLogic', () => {
    it('should filtered out drink if already present in cocktailFavorites', () => {
      const mockTargetCocktail = {
        id: 1,
        name: 'Moscow Mule'
      }
      wrapper.instance().toggleFavoriteLogic(mockTargetCocktail, true);

      expect(mockToggleFavorite).toHaveBeenCalledWith([])
    })

    it('should add drink if not already present in cocktailFavorites', () => {
      const mockTargetCocktail = {
        id: 1,
        name: 'Gin and Tonic'
      }
      wrapper.instance().toggleFavoriteLogic(mockTargetCocktail, false);

      expect(mockToggleFavorite).toHaveBeenCalledWith([...mockFavoriteCocktails, mockTargetCocktail])
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with the favoriteCocktails array', () => {
      const mockState = {
        selectedDrink: { id: 3, name: 'Gin and Tonic' },
        currentCocktails: [{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }],
        favoriteCocktails: mockFavoriteCocktails
      };
      const expected = {
        favoriteCocktails: mockFavoriteCocktails
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with an showSelectDrink action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = showSelectDrink({ id: 1, name: 'Moscow Mule' });
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.showSelectDrink({ id: 1, name: 'Moscow Mule' });
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with an toggleFavorite action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = toggleFavorite([{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }]);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleFavorite([{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }])
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
})