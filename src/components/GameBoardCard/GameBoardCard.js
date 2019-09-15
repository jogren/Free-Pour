import React from 'react';
import './GameBoardCard.css';

const GameBoardCard = ({ ingredient, index }) => {

  return (
    <section className="GameBoardCard_section">
      {!ingredient.guessed && <div className="Game-card_div incorrect-guess">
        <p>{index + 1}</p>
      </div>}
      {ingredient.guessed && <div className="Game-card_div correct-guess">
        <p>{ingredient.ingredient} - {ingredient.measure}</p>
      </div> }
    </section>

  )
}

export default GameBoardCard;