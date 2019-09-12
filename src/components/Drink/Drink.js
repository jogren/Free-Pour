import React, { Component } from 'react';
import { fetchMoreDrinkInfo } from '../../apiCalls/apiCalls';
import './Drink.css';

class Drink extends Component {
  constructor() {
    super();
    this.state = {
      selectedDrink: {}
    }

  }

  handleShowMore = async () => {
      const response = await fetchMoreDrinkInfo(this.props.name)
      this.setState({ selectedDrink: response })
  }

  render() {
    const { selectedDrink } = this.state;
    console.log(this.state.selectedDrink)
    const { image, name } = this.props
    return (
      <section className="Drink_section">
        <img className="Drink_image" src={image}/>
        <h3>{name}</h3>
        <button onClick={this.handleShowMore}>How to Make</button>
        { this.state.selectedDrink !== {} && 
          <div>
            <h4>{selectedDrink.name}</h4>
            <p>{selectedDrink.instructions}</p>
          </div>
        }
      </section>
    )
  }
}

export default Drink;