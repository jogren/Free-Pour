import React, { Component } from 'react';
import { fetchMoreDrinkInfo } from '../../apiCalls/apiCalls';
import { connect } from 'react-redux';
import { selectDrink } from '../../actions';
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
    this.props.selectDrink(response)
    // this.setState({ selectedDrink: response })
  }

  render() {
    console.log(this.state.selectedDrink)
    const { image, name } = this.props
    return (
      <section className="Drink_section">
        <img className="Drink_image" src={image}/>
        <h3>{name}</h3>
        <button onClick={this.handleShowMore}>How to Make</button>
      </section>
    )
  }
}

const mapStateToProps = ({ selectedDrink }) => ({
  selectedDrink,
});

const mapDispatchToProps = dispatch => ({
  selectDrink: (targetDrink) => dispatch(selectDrink(targetDrink))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drink);