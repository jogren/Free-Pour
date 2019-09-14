import React from 'react';
import './GameBoardCard.css';

const GameBoardCard = ({ ingredient, index }) => {

  return (
    <section>
      {!ingredient.guessed && <div className="Game-card_div incorrect-guess">
        <p>{index + 1}</p>
      </div>}
      {ingredient.guessed && <div className="Game-card_div correct-guess">
        <p>{ingredient.ingredient}</p>
      </div> }
    </section>

  )
}

export default GameBoardCard;