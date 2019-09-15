import { fetchPopularCocktails, fetchCocktailsByGenre, fetchCocktailsBySearch, fetchAllIngredients, fetchMoreDrinkInfo } from './apiCalls';

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

describe('fetchCocktailsByGenre', () => {
  let mockCocktailsByGenre;
  beforeEach(() => {
    mockCocktailsByGenre = {
      drinks: [
        {
          strDrink: 'Moscow Mules',
          strDrinkThumb: 'image.png'
        },
        {
          strDrink: 'Vodka Soda',
          strDrinkThumb: 'image2.png'
        }
      ]
    }
  });

  it('should invoke fetch with a specific URL', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCocktailsByGenre)
      });
    });
    fetchCocktailsByGenre('test');
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=test');
  });

  it('should return an array of CocktailsByGenre', () => {
    let expected = [
      {
        strDrink: 'Moscow Mules',
        strDrinkThumb: 'image.png'
      },
      {
        strDrink: 'Vodka Soda',
        strDrinkThumb: 'image2.png'
      }
    ]

    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCocktailsByGenre)
      });
    });
    expect(fetchCocktailsByGenre('test')).resolves.toEqual(expected);
  });

  it('should throw an error with the response is not ok (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(fetchCocktailsByGenre('test')).rejects.toEqual(Error('There was an issue fetching your data by genre'));
  });

  it('should return catch error if promise rejects (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Server is down'
      })
    });
    expect(fetchCocktailsByGenre('test')).rejects.toEqual(Error('Server is down'));
  });
});

describe('fetchCocktailsBySearch', () => {
  let mockCocktailsBySearch;
  beforeEach(() => {
    mockCocktailsBySearch = {
      drinks: [
        {
          strDrink: 'Moscow Mules',
          strDrinkThumb: 'image.png'
        },
        {
          strDrink: 'Vodka Soda',
          strDrinkThumb: 'image2.png'
        }
      ]
    }
  });

  it('should invoke fetch with a specific URL', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCocktailsBySearch)
      });
    });
    fetchCocktailsBySearch('test');
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=test');
  });

  it('should return an array of CocktailsBySearch', () => {
    let expected = [
      {
        strDrink: 'Moscow Mules',
        strDrinkThumb: 'image.png'
      },
      {
        strDrink: 'Vodka Soda',
        strDrinkThumb: 'image2.png'
      }
    ]

    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCocktailsBySearch)
      });
    });
    expect(fetchCocktailsBySearch('vodka')).resolves.toEqual(expected);
  });

  it('should throw an error with the response is not ok (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(fetchCocktailsBySearch('vodka')).rejects.toEqual(Error('There was an issue fetching your data by name'));
  });

  it('should return catch error if promise rejects (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Server is down'
      })
    });
    expect(fetchCocktailsBySearch('vodka')).rejects.toEqual(Error('Server is down'));
  });
});

describe('fetchAllIngredients', () => {
  let mockAllIngredients;
  beforeEach(() => {
    mockAllIngredients = { 
      drinks: [
        { strIngredient1: "Light rum" },
        { strIngredient1: "Applejack" }
      ]
    }
  });

  it('should invoke fetch with a specific URL', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAllIngredients)
      });
    });
    fetchAllIngredients();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  });

  it('should return an array of allIngredients', () => {
    let expected = ["Light rum", "Applejack"]


    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAllIngredients)
      });
    });
    expect(fetchAllIngredients()).resolves.toEqual(expected);
  });

  it('should throw an error with the response is not ok (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(fetchAllIngredients()).rejects.toEqual(Error('There was an issue fetching all ingredients'));
  });

  it('should return catch error if promise rejects (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Server is down'
      })
    });
    expect(fetchAllIngredients()).rejects.toEqual(Error('Server is down'));
  });
});

describe('fetchMoreDrinkInfo', () => {
  let mockMoreDrinkInfo;
  beforeEach(() => {
    mockMoreDrinkInfo = {
      drinks: [
        {
          strDrink: "Mojito",
          strGlass: "Highball glass",
          strInstructions: 'Muddle mint leaves...',
          strDrinkThumb: 'image.png',
          strIngredient1: "Light rum",
          strIngredient2: "Lime",
          strIngredient3: "Sugar",
          strIngredient4: "Mint",
          strIngredient5: "Soda water",
          strIngredient6: "",
          strMeasure1: "2-3 oz",
          strMeasure2: "Juice of 1",
          strMeasure3: "2 tsp",
          strMeasure4: "2-4",
          strMeasure5: "",
          strMeasure6: "",
        }
      ]
    }
  });

  it('should invoke fetch with a specific URL', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMoreDrinkInfo)
      });
    });
    fetchMoreDrinkInfo('Mojito');
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Mojito')
  });

  it('should return an array of fetchMoreDrinkInfo', () => {
    let expected = {
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
          ingredient: 'Lime',
          measure: 'Juice of 1'
        },
        {
          guessed: false,
          ingredient: 'Sugar',
          measure: '2 tsp'
        },
        {
          guessed: false,
          ingredient: 'Mint',
          measure: "2-4",
        },
        {
          guessed: false,
          ingredient: 'Soda water',
          measure: ''
        },
        {
          guessed: false,
          ingredient: '',
          measure: ''
        }
      ]
    }


    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMoreDrinkInfo)
      });
    });
    expect(fetchMoreDrinkInfo('Mojito')).resolves.toEqual(expected);
  });

  it('should throw an error with the response is not ok (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(fetchMoreDrinkInfo('Mojito')).rejects.toEqual(Error('There was an error fetch your data'));
  });

  it('should return catch error if promise rejects (SAD)', () => {
    fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Server is down'
      })
    });
    expect(fetchMoreDrinkInfo('Mojito')).rejects.toEqual(Error('Server is down'));
  });
});







