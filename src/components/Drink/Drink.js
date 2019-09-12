import React, { Component } from 'react';
import { fetchMoreDrinkInfo } from '../../apiCalls/apiCalls';
import { connect } from 'react-redux';
import { showSelectDrink } from '../../actions';
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
    this.props.showSelectDrink(response)
    // this.setState({ selectedDrink: response })
  }

  render() {
    const { image, name } = this.props
    return (
      <section className="Drink_section">
        <img className="Drink_image" src={image} alt={name}/>
        <h3>{name}</h3>
        <button onClick={this.handleShowMore}>How to Make</button>
      </section>
    )
  }
}

const mapStateToProps = ({ toggleSelectedDrink }) => ({
  toggleSelectedDrink,
});

const mapDispatchToProps = dispatch => ({
  showSelectDrink: (targetDrink) => dispatch(showSelectDrink(targetDrink))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drink);