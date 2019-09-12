import React, { Component } from 'react';
import { fetchMoreDrinkInfo } from '../../apiCalls/apiCalls';
import { connect } from 'react-redux';
import { showSelectDrink, toggleFavorite } from '../../actions';
import './Drink.css';

class Drink extends Component {
  constructor() {
    super();

  }

  handleShowMore = async () => {
    const response = await fetchMoreDrinkInfo(this.props.name)
    this.props.showSelectDrink(response)
  }

  toggleFavorite = async (name) => {
    const { favoriteCocktails, toggleFavorite } = this.props;
    const targetCocktail = await fetchMoreDrinkInfo(name.name)
    let isPresent = favoriteCocktails.find(drink => drink.name === targetCocktail.name)
    if(isPresent) {
      let filteredCocktails = favoriteCocktails.filter(cocktail => cocktail.name !== targetCocktail.name)
      toggleFavorite(filteredCocktails)
    } else {
      toggleFavorite([...favoriteCocktails, targetCocktail])
    }
  }

  render() {
    const { image, name } = this.props;
    return (
      <section className="Drink_section">
        <img className="Drink_image" src={image} alt={name}/>
        <h3>{name}</h3>
        <button onClick={this.handleShowMore}>How to Make</button>
        <button onClick={() => this.toggleFavorite({name})}>Favorite this Drink!</button>
      </section>
    )
  }
}

const mapStateToProps = ({ favoriteCocktails }) => ({
  favoriteCocktails
});

const mapDispatchToProps = dispatch => ({
  showSelectDrink: targetDrink => dispatch(showSelectDrink(targetDrink)),
  toggleFavorite: cocktails => dispatch(toggleFavorite(cocktails))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drink);