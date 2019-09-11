import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v2/8673533/popular.php';
    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error('There was an error fetch your data')
      }
      const popularCocktails = await response.json()
      const cleanedCocktails = popularCocktails.drinks.map(drink => ({
        name: drink.strDrink,
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb,
        ingredient1: drink.strIngredient1,
        ingredient2: drink.strIngredient2,
        ingredient3: drink.strIngredient3,
        ingredient4: drink.strIngredient4,
        ingredient5: drink.strIngredient5,
        ingredient6: drink.strIngredient6,
        measure1: drink.strMeasure1,
        measure2: drink.strMeasure2,
        measure3: drink.strMeasure3,
        measure4: drink.strMeasure4,
        measure5: drink.strMeasure5,
        measure6: drink.strMeasure6
      }))
      console.log(cleanedCocktails)

    } catch(error) {
      throw new Error(error.message)
    }
  }

  render() {
    return (
      <main>
        <h1>Hello</h1>
      </main>
    );
  }
}

export default App;
