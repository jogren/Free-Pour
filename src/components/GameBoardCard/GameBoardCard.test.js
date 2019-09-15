import React from 'react';
import { shallow } from 'enzyme';
import GameBoardCard from './GameBoardCard';

describe('GameBoardCard', () => {
  let wrapper;
  const mockIngredient = { 
    measure: "2 tsp ", 
    ingredient: "Sugar", 
    guessed: false 
  }

  beforeEach(() => {
    wrapper = shallow(<GameBoardCard 
      index={0}
      ingredient={mockIngredient}
    />);
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });
})