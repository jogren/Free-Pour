import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  newSearch = (e) => {
    console.log('test')
  }

  render() {
    return (
      <nav>
        <div>
          <input type="search"  />
          <button>Submit</button>
        </div>
        <select onChange={(e) => this.newSearch(e.target.value)} className="select-container">
          <option value="">Select Genre:</option>
          <option value="Comedy">Vodka</option>
          <option value="Horror">Bourbon</option>
          <option value="Fiction">Tequila</option>
          <option value="Romance">Gin</option>
          <option value="Adventure">Rum</option>
          <option value="Non fiction">Whiskey</option>
        </select>
        <p>Favorites</p>
      </nav>
    );
  }
}

export default Nav;