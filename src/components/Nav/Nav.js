import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCocktailsBySearch } from '../../apiCalls/apiCalls';
import { setCurrentCocktails } from '../../actions';

import './Nav.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchHasErrored: ''
    }
  }

  handleSearch = e => {
    this.setState({ searchHasErrored: '' })
    this.setState({ [e.target.name]: e.target.value })
  }

  getCocktailsBySearch = async () => {
    try {
      const searchedCocktails = await fetchCocktailsBySearch(this.state.search)
      if (searchedCocktails === null) {
        this.setState({ searchHasErrored: 'Please try again!' })
      } else {
        console.log(searchedCocktails)
        this.props.setCurrentCocktails(searchedCocktails)
      }
      this.setState({ search: '' })
    } catch(error) {
      throw new Error(error.message)
    }
  }

  render() {
    const { getCocktailsByGenre, favoriteCocktails } = this.props
    return (
      <nav>
        <div>
          <input 
            type="search"
            placeholder="Search for a drink..."
            name="search"
            value={this.state.search}
            onChange={(e) => this.handleSearch(e)}
          />
          <button onClick={this.getCocktailsBySearch}>Submit</button>
          { this.state.searchHasErrored && <p>Please try again</p>}
        </div>
        <select onChange={(e) => getCocktailsByGenre(e.target.value)} className="select-container">
          <option value="">Select Genre:</option>
          <option value="vodka">Vodka</option>
          <option value="bourbon">Bourbon</option>
          <option value="tequila">Tequila</option>
          <option value="gin">Gin</option>
          <option value="rum">Rum</option>
          <option value="whiskey">Whiskey</option>
          <option value="popular">Popular</option>
        </select>
        <p>Favorites {favoriteCocktails.length}</p>
        <button>Quiz me on my favorites</button>
      </nav>
    );
  }
}

const mapStateToProps = ({ favoriteCocktails }) => ({
  favoriteCocktails
});

const mapDispatchToProps = dispatch => ({
  setCurrentCocktails: cocktails => dispatch(setCurrentCocktails(cocktails))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);