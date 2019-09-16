import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCocktailsBySearch } from '../../apiCalls/apiCalls';
import { setCurrentCocktails } from '../../actions';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export class Nav extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchHasErrored: '',
      favoritesHasErrored: ''
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
            <div className="Nav_div">
              <input 
                className="Nav_input-search"
                autoComplete="off"
                placeholder="Search for a drink..."
                name="search"
                value={this.state.search}
                onChange={(e) => this.handleSearch(e)}
                />
            <button onClick={this.getCocktailsBySearch} disabled={!this.state.search}>Submit</button>
              { this.state.searchHasErrored && <p>Please Check your Spelling!</p>}
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
          {favoriteCocktails.length > 0 && <NavLink to='/game-play'>
            <button className="button-quiz-favorites">Quiz me on my favorites</button>
          </NavLink>}
          <p className="Nav_p-favorites">Favorites <br />{favoriteCocktails.length}</p>
        </nav>
    );
  }
}

const mapStateToProps = ({ favoriteCocktails }) => ({
  favoriteCocktails
});

export const mapDispatchToProps = dispatch => ({
  setCurrentCocktails: cocktails => dispatch(setCurrentCocktails(cocktails))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);