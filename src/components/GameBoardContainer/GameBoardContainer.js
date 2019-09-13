import React from 'react';
import './GameBoardContainer.css';

const GameBoardContainer = ({ currentDrink }) => {

  console.log(currentDrink)
  let ingredientDivs = currentDrink.ingredients.map((ingredient, index) => {
    if(ingredient.ingredient) {
      return (
        <div key={index}>
          <p>{ingredient.ingredient}</p>
        </div>
      );
    }
  });

  return (
    <section>
      {ingredientDivs}
    </section>
  );
}

export default GameBoardContainer;