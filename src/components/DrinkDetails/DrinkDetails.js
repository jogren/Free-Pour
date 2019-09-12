import React from 'react';
import './DrinkDetails.css';

const DrinkDetails = ({ toggleSelectedDrink, hideSelectedDrink}) => {
  let ingredientsList = toggleSelectedDrink.ingredients.map((ingredient, index) => {
    if (ingredient.measure !== '' && ingredient.ingredient !== '') {
      return <p key={index}>{ingredient.measure} {ingredient.ingredient}</p>
    }
  });

  return (
    <section className="Details_section">
      <div className="Details_button-container">
        <button onClick={hideSelectedDrink}>x</button>
      </div>
      <p className="Details-name">{toggleSelectedDrink.name}</p>
      <p className="Details-glass">{toggleSelectedDrink.glass}</p>
      <div className="Details_img-ingredients">
        <img src={toggleSelectedDrink.image} alt={toggleSelectedDrink.name}/>
        <div className="Details-ingredients">
          <h6>Ingredients!</h6>
          {ingredientsList}
        </div>
      </div>
      <p>{toggleSelectedDrink.instructions}</p>
    </section>
  );
}

export default DrinkDetails;