import React from 'react';
import './DrinkDetails.css';

const DrinkDetails = ({ selectedDrink, hideSelectedDrink}) => {
  let ingredientsList = selectedDrink.ingredients.map((ingredient, index) => {
    if (ingredient.measure !== '' && ingredient.ingredient !== '') {
      return <p key={index}>{ingredient.measure} {ingredient.ingredient}</p>
    }
  });

  return (
    <section className="Details_section">
      <div className="Details_button-container">
        <button onClick={hideSelectedDrink}>x</button>
      </div>
      <p className="Details-name">{selectedDrink.name}</p>
      <p className="Details-glass">{selectedDrink.glass}</p>
      <div className="Details_img-ingredients">
        <img src={selectedDrink.image} alt={selectedDrink.name}/>
        <div className="Details-ingredients">
          <h6>Ingredients!</h6>
          {ingredientsList}
        </div>
      </div>
      <p className="Details-instructions">{selectedDrink.instructions}</p>
    </section>
  );
}

export default DrinkDetails;