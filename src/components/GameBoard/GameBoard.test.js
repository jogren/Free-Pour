import React from 'react';
import { shallow } from 'enzyme';
import { GameBoard, mapDispatchToProps } from './GameBoard';
import { fetchAllIngredients } from '../../apiCalls/apiCalls';
import { toggleFavorite } from '../../actions';

jest.mock('../../apiCalls/apiCalls');

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
    
    it('should invoke handleIngredientSearch onChange of input', () => {
      wrapper.instance().handleIngredientSearch = jest.fn();
      wrapper.instance().forceUpdate();
      
      wrapper.find('input').simulate('change')
      expect(wrapper.instance().handleIngredientSearch).toHaveBeenCalled();
    })
    
  describe('componentDidMount', () => {
    it('should call fetchAllIngredients', () => {
      expect(fetchAllIngredients).toHaveBeenCalled();
    })
  })

  describe('resetGame', () => {
    it('should reset the game and structure cocktails', () => {
      const expected = [
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
      wrapper.instance().resetGame();
      expect(mockToggleFavorite).toHaveBeenCalledWith(expected)
      expect(wrapper.state('roundCounter')).toEqual(0)
      expect(wrapper.state('roundFinished')).toEqual(false)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with an toggleFavorite action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = toggleFavorite([{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }]);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleFavorite([{ id: 1, name: 'Moscow Mule' }, { id: 2, name: 'Vodka Soda' }])
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
})