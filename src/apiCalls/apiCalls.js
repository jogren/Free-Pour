export const fetchPopularCocktails = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/8673533/popular.php';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('There was an error fetch your data')
    }
    const popularCocktails = await response.json()
    return popularCocktails.drinks.map(drink => ({
      strDrink: drink.strDrink,
      strDrinkThumb: drink.strDrinkThumb,
    }))
  } catch(error) {
    throw new Error(error.message)
  }
}

export const fetchCocktailsByGenre = async (type) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`
  try {
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error('There was an issue fetching your data by genre')
    }
    const cocktails = await response.json();
    return cocktails.drinks
  } catch (error) {
    throw new Error(error.message)

  }
}

export const fetchCocktailsBySearch = async (text) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`
  try {
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error('There was an issue fetching your data by name')
    }
    const cocktails = await response.json();
    return cocktails.drinks
  } catch(error) {
    throw new Error(error.message)
  }
}

export const fetchAllIngredients = async () => {
  const url = '  https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('There was an issue fetching all ingredients')
    }
    const ingredients = await response.json();
    return ingredients.drinks.map(drink => drink.strIngredient1)
  } catch(error) {
    throw new Error(error.message)
  }
}

export const fetchMoreDrinkInfo = async (name) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name.split(' ').join('_')}`)
    if (!response.ok) {
      throw new Error('There was an error fetch your data')
    }
    const cocktail = await response.json();
    const cleanedCocktail = cocktail.drinks.map(drink => ({
      name: drink.strDrink,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      image: drink.strDrinkThumb,
      ingredients: [
        { measure: drink.strMeasure1, ingredient: drink.strIngredient1 },
        { measure: drink.strMeasure2, ingredient: drink.strIngredient2 },
        { measure: drink.strMeasure3, ingredient: drink.strIngredient3 },
        { measure: drink.strMeasure4, ingredient: drink.strIngredient4 },
        { measure: drink.strMeasure5, ingredient: drink.strIngredient5 },
        { measure: drink.strMeasure6, ingredient: drink.strIngredient6 }
      ]
    }))
    return cleanedCocktail[0]
  } catch(error) {
    throw new Error(error.message)
  }
}