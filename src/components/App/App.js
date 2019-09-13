import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import DrinkContainer from '../DrinkContainer/DrinkContainer';
import DrinkDetails from '../DrinkDetails/DrinkDetails';
import GameBoard from '../GameBoard/GameBoard';
import { hideSelectedDrink, setCurrentCocktails } from '../../actions';
import { fetchPopularCocktails, fetchCocktailsByGenre } from '../../apiCalls/apiCalls';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    try {
      const popularCocktails = await fetchPopularCocktails();
      this.props.setCurrentCocktails(popularCocktails)
    } catch(error) {
      throw new Error(error.message)
    }
  }

  getCocktailsByGenre = async (type) => {
    if(type === 'popular') {
      try {
        const popularCocktails = await fetchPopularCocktails();
        this.props.setCurrentCocktails(popularCocktails)
      } catch (error) {
        throw new Error(error.message)
      }
    } else {
      try {
        const cocktailsByGenre = await fetchCocktailsByGenre(type)
        this.props.setCurrentCocktails(cocktailsByGenre);
      } catch(error) {
        throw new Error(error.message)
      }
    }
  }

  render() {
    const { selectedDrink, hideSelectedDrink, currentCocktails } = this.props
    let blur = selectedDrink.name ? 'blur-filter' : ''
    return (
      <main className="App_main">
        <Route exact path="/" render={() =>
        <section>
          {selectedDrink.name && (<DrinkDetails selectedDrink={selectedDrink} hideSelectedDrink={hideSelectedDrink} />) }
          <div className={blur}>
            <Header/>
            <Nav getCocktailsByGenre={this.getCocktailsByGenre}/>
            <DrinkContainer drinks={currentCocktails}/>
          </div>
        </section>
        } />
        <Route path="/game-play" render={() => 
          <section>
            <Header />
            <GameBoard />
          </section>
        }/>
      </main>
    );
  }
}

const mapStateToProps = ({ selectedDrink, currentCocktails }) => ({
  selectedDrink,
  currentCocktails
});

const mapDispatchToProps = dispatch => ({
  hideSelectedDrink: () => dispatch(hideSelectedDrink()),
  setCurrentCocktails: cocktails => dispatch(setCurrentCocktails(cocktails))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
