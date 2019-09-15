import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />)
  })

  it('should take a snapshot when passed the correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });
})