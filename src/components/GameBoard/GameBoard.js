import React, { Component } from 'react';
import GameBoardContainer from '../GameBoardContainer/GameBoardContainer';
import { connect } from 'react-redux';
import { fetchAllIngredients } from '../../apiCalls/apiCalls';
import './GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundCounter: this.props.favoriteCocktails.length - 1,
      ingredientSearch: '',
      allIngredients: []
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

  handleIngredientSearch = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    let addAdditionalIngredients = [...this.state.allIngredients, 'Coca-Cola',]
    let ingredientList = addAdditionalIngredients.map((ingredient, index) => {
      return <option key={index} value={ingredient}/>
    })
    const { favoriteCocktails } = this.props;
    return (
      <main>
        <h3>What's in a {favoriteCocktails[this.state.roundCounter].name}?</h3>
        <GameBoardContainer currentDrink={favoriteCocktails[this.state.roundCounter]}/>
        <section className="Board_section-ingredients">
          <input 
            type="text"
            placeholder="Search for Ingredients..."
            name="ingredientSearch"
            value={this.state.ingredientSearch}
            onChange={(e) => this.handleIngredientSearch(e)}
            list="ingredient-list"
          />
          <datalist id="ingredient-list">{ingredientList}</datalist>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ }) => ({
})

export default connect(mapStateToProps)(GameBoard);

