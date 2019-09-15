import React from 'react';
import { shallow } from 'enzyme';
import DrinkContainer from './DrinkContainer';

describe('DrinkContainer', () => {
  let wrapper;
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
  beforeEach(() => {
    wrapper = shallow(<DrinkContainer 
      drinks={mockCurrentCocktails}
    />)
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  })
})