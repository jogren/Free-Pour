import React from 'react';
import { fetchPopularCocktails } from './apiCalls';

describe('fetchPopularCocktails', () => {
  let mockPopularCocktails;
  beforeEach(() => {
    mockPopularCocktails = {
      drinks: [
        {
          strDrink: 'Moscow Mules',
          strDrinkThumb: 'image.png'
        },
        {
          strDrink: 'Gin and Tonic',
          strDrinkThumb: 'image2.png'
        }
      ]
    }
  });

  it('should invoke fetch with a specific URL', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPopularCocktails)
      });
    });
    fetchPopularCocktails();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v2/8673533/popular.php');
  });

  it('should return an array of popularCocktails', () => {
    let expected = [
        {
          strDrink: 'Moscow Mules',
          strDrinkThumb: 'image.png'
        },
        {
          strDrink: 'Gin and Tonic',
          strDrinkThumb: 'image2.png'
        }
      ]

    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPopularCocktails)
      });
    });
    expect(fetchPopularCocktails()).resolves.toEqual(expected);
  });

  it('should throw an error with the response is not ok (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(fetchPopularCocktails()).rejects.toEqual(Error('There was an error fetch your data'));
  });

  it('should return catch error if promise rejects (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Server is down'
      })
    });
    expect(fetchPopularCocktails()).rejects.toEqual(Error('Server is down'));
  });
});

