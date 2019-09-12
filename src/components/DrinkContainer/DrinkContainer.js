import React from 'react';
import Drink from '../Drink/Drink';
import './DrinkContainer.css';

const DrinkContainer = ({ drinks }) => {
  let drinkList = drinks.map((drink, index) => {
    return <Drink key={index} image={drink.image} name={drink.name} />
  })

  return(
    <section className="DrinkContainer_section">
      {drinkList}
    </section>
  )
}

export default DrinkContainer;