import React from 'react';
import GameBoardCard from '../GameBoardCard/GameBoardCard';
import './GameBoardContainer.css';

const GameBoardContainer = ({ currentDrink }) => {
  console.log(currentDrink)
  let ingredientDivs = currentDrink.ingredients.map((ingredient, index) => {
    if(ingredient.ingredient) {
      return <GameBoardCard key={index} index={index} ingredient={ingredient}/>
    }
  });

  return (
    <section className="GameBoardContainer_section">
      {ingredientDivs}
    </section>
  );
}

export default GameBoardContainer;