import React, { Component } from 'react';
import GameBoardContainer from '../GameBoardContainer/GameBoardContainer';
import { connect } from 'react-redux';
import { fetchAllIngredients } from '../../apiCalls/apiCalls';
import { toggleFavorite } from '../../actions';
import { NavLink } from 'react-router-dom';
import wrongAnswerImage from '../../images/wrong-answer.png';
import './GameBoard.css';

export class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundCounter: 0,
      ingredientSearch: '',
      allIngredients: [],
      roundFinished: false,
      wrongAnswerError: ''
    }
  }

  componentDidMount = async () => {
    try {
      const allIngredients = await fetchAllIngredients();
      this.setState({ allIngredients: allIngredients })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  handleSubmitGuess = () => {
    let { roundCounter, ingredientSearch } = this.state;
    const { favoriteCocktails } = this.props;
    let isCorrect = favoriteCocktails[roundCounter].ingredients.find(ingredient => {
      if (ingredient.ingredient !== null) {
        return ingredient.ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
      }
    })
    if(isCorrect) {
      isCorrect.guessed = true
    } else {
      this.setState({ wrongAnswerError: 'wrong' })
      setTimeout(() => { this.setState({ wrongAnswerError: '' }) }, 500);
    }
    let allTrue = favoriteCocktails[roundCounter].ingredients.every(ingredient => ingredient.guessed || ingredient.ingredient === null)
    if (allTrue && roundCounter + 1 === favoriteCocktails.length) {
      this.state.roundFinished = true
    } else if (allTrue) {
      this.state.roundCounter++
    }
    this.setState({ ingredientSearch: '' })
  }

  handleIngredientSearch = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  resetGame = () => {
    let { favoriteCocktails, toggleFavorite } = this.props;
    let favoriteCocktailsReset = favoriteCocktails.map(cocktail => {
        return {
          name: cocktail.name,
          glass: cocktail.glass,
          image: cocktail.image,
          instructions: cocktail.instructions,
          ingredients: cocktail.ingredients.map(ingredient => {
            return {
              measure: ingredient.measure,
              ingredient: ingredient.ingredient,
              guessed: false
            }
          })
        }
      })
    toggleFavorite(favoriteCocktailsReset)
    this.setState({ roundCounter: 0, roundFinished: false })
  }

  render() {
    const { favoriteCocktails } = this.props;
    const { roundCounter, ingredientSearch, allIngredients, roundFinished, wrongAnswerError } = this.state;
    let addMoreIngredientOptions = [...allIngredients, 'Coca-Cola', 'Olive', 'Soda Water', 'Cherry', 'Mint', 'Blue Curacao', 'Angostura Bitters', 'Campari']
    let ingredientList = addMoreIngredientOptions.map((ingredient, index) => {
      return <option key={index} value={ingredient}/>
    })
    return (
      <main className="GameBoard_main">
        <h3>Can you guess what's in a {favoriteCocktails[roundCounter].name}?</h3>
        <form className="Board_section-ingredients">
          <input 
            className="GameBoard_input"
            type="text"
            placeholder="Guess an ingredient..."
            name="ingredientSearch"
            value={ingredientSearch}
            onChange={(e) => this.handleIngredientSearch(e)}
            list="ingredient-list"
          />
          <datalist id="ingredient-list">{ingredientList}</datalist>
          <button onClick={this.handleSubmitGuess} disabled={!this.state.ingredientSearch}>Submit Guess</button>
        </form>
        <GameBoardContainer currentDrink={favoriteCocktails[this.state.roundCounter]}/>
        <NavLink to="/">
          <button className="button-home" onClick={this.resetGame}>Back to Home Page</button>
        </NavLink>
        {roundFinished && (
          <div className="div-round-finished">
            <h4>Congrats! You reviewed all of your favorites!</h4> 
            <NavLink to="/">
              <button onClick={this.resetGame}>Keep studying!</button>
            </NavLink>
          </div>
        )}
        {wrongAnswerError && <img src={wrongAnswerImage} className="wrong-answer-error"/> }
      </main>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  toggleFavorite: (cocktails) => dispatch(toggleFavorite(cocktails))
})

export default connect(null, mapDispatchToProps)(GameBoard);

