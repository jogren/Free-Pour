import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import DrinkContainer from '../DrinkContainer/DrinkContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state ={
      popularCocktails: []
    }
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
        ingredients: [
          { measure: drink.strMeasure1, ingredient: drink.strIngredient1 },
          { measure: drink.strMeasure2, ingredient: drink.strIngredient2 },
          { measure: drink.strMeasure3, ingredient: drink.strIngredient3 },
          { measure: drink.strMeasure4, ingredient: drink.strIngredient4 },
          { measure: drink.strMeasure5, ingredient: drink.strIngredient5 },
          { measure: drink.strMeasure6, ingredient: drink.strIngredient6 }
        ]
      }))
      this.setState({ popularCocktails: cleanedCocktails })
      console.log(cleanedCocktails)

    } catch(error) {
      throw new Error(error.message)
    }
  }

  render() {
    return (
      <main>
        <Header />
        <Nav />
        <DrinkContainer drinks={this.state.popularCocktails}/>
      </main>
    );
  }
}

export default App;
