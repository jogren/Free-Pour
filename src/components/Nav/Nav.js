import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  render() {
    const { getCocktailsByGenre } = this.props
    return (
      <nav>
        <div>
          <input type="search"  />
          <button>Submit</button>
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
        <p>Favorites</p>
      </nav>
    );
  }
}

export default Nav;