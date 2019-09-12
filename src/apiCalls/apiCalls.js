export const fetchMoreDrinkInfo = async (name) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name.split(' ').join('_')}`)
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

  }

}