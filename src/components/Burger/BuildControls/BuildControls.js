import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      {controls.map(control => {
        return (
          <BuildControl
            added={props.ingredientAdded}
            removed={props.ingredientRemoved}
            key={control.label}
            label={control.label}
            type={control.type}
            disable={props.disableInfo[control.type]}
          />
        );
      })}
      <button
        onClick={props.orderNow}
        disabled={!props.purchasable}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
