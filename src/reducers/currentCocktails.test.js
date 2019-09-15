import { currentCocktails } from './currentCocktails';

describe('currentCocktails', () => {
  it('should return an empty array of default', () => {
    let mockState = [{ id: 1, name: 'Moscow Mule' }]
    let mockAction = { type: undefined}

    expect(currentCocktails(mockState, mockAction)).toEqual(mockState)
  })

  it('should return cocktails property of action if given SET_CURRENT_COCKTAILS', () => {
    let mockState = [{ id: 1, name: 'Moscow Mule' }]

    let mockAction = { 
      type: 'SET_CURRENT_COCKTAILS',
      cocktails: [
        {
          id: 2, 
          name: 'Moscow Mule'
        },
        {
          id: 3,
          name: 'Gin and Tonic'
        }
      ]
    }

    let expected = [
      {
        id: 2,
        name: 'Moscow Mule'
      },
      {
        id: 3,
        name: 'Gin and Tonic'
      }
    ]

    expect(currentCocktails(mockState, mockAction)).toEqual(expected)
  })
})