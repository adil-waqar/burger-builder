import React from 'react';
import classes from './Order.module.css';

const Order = props => {
  let ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  let ingredientsOutput = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: 'capitalize',
          border: '1px solid #ccc',
          padding: '5px',
          margin: '0px 2px'
        }}
      >
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {props.totalPrice}</strong>
      </p>
    </div>
  );
};

export default Order;
