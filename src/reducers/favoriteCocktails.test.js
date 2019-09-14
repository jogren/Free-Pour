import { favoriteCocktails } from './favoriteCocktails';

describe('favoriteCocktails', () => {
  it('should return an empty array of default', () => {
    let mockState = [{ id: 1, name: 'Moscow Mule' }]
    let mockAction = { type: undefined }

    expect(favoriteCocktails(mockState, mockAction)).toEqual(mockState)
  })

  it('should return cocktails property of action if given TOGGLE_FAVORITE', () => {
    let mockState = [{ id: 1, name: 'Moscow Mule' }]

    let mockAction = {
      type: 'TOGGLE_FAVORITE',
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

    expect(favoriteCocktails(mockState, mockAction)).toEqual(expected)
  })
})