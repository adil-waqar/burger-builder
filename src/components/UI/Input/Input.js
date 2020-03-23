import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;
  let {
    elementType,
    elementConfig,
    value,
    name,
    invalid,
    shouldValidate,
    touched
  } = props;

  const updatedClasses = [classes.InputElement];
  if (invalid && shouldValidate && touched)
    updatedClasses.push(classes.Invalid);

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          name={name}
          onChange={props.changed}
          className={updatedClasses.join(' ')}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          name={name}
          onChange={props.changed}
          className={updatedClasses.join(' ')}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          name={name}
          onChange={props.changed}
          className={updatedClasses.join(' ')}
        >
          {elementConfig.options.map(selOption => {
            return (
              <option key={selOption.value} value={selOption.value}>
                {selOption.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          name={name}
          onChange={props.changed}
          className={updatedClasses.join(' ')}
          {...elementConfig}
          value={value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
