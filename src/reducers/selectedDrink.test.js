import { selectedDrink } from './selectedDrink';

describe('selectedDrink', () => {
  it('should return an empty array of default', () => {
    let mockState = { id: 1, name: 'Moscow Mule' }
    let mockAction = { type: undefined }

    expect(selectedDrink(mockState, mockAction)).toEqual(mockState)
  })

  it('should return a drink if given SHOW_SELECT_DRINK', () => {
    let mockState = {}

    let mockAction = {
      type: 'SHOW_SELECT_DRINK',
      targetDrink: {
          id: 2,
          name: 'Moscow Mule'
      }
    }

    let expected = {
      id: 2,
      name: 'Moscow Mule'
    }

    expect(selectedDrink(mockState, mockAction)).toEqual(expected)
  })

  it('should return an empty object if given HIDE_SELECTED_DRINK', () => {
    let mockState = { id: 1, name: 'Moscow Mule' }

    let mockAction = {
      type: 'HIDE_SELECTED_DRINK',
      targetDrink: {
        id: 2,
        name: 'Moscow Mule'
      }
    }

    let expected = {}

    expect(selectedDrink(mockState, mockAction)).toEqual(expected)
  })
})