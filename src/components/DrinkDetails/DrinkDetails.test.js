import React from 'react';
import { shallow } from 'enzyme';
import DrinkDetails from './DrinkDetails';

describe('DrinkDetails', () => {
  let wrapper;
  const mockHideSelectedDrink = jest.fn();
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

  beforeEach(() => {
    wrapper = shallow(<DrinkDetails 
      selectedDrink={mockSelectedDrink}
      hideSelectedDrink={mockHideSelectedDrink}
    />)
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });
})