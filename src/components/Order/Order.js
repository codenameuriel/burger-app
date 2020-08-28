import React from 'react';
import OrderStyles from './Order.module.css';

const Order = props => {
  const renderIngredients = () => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
      ingredients.push(`${props.ingredients[ingredient]} ${ingredient}`);
    }
    
    const ingredientsList = ingredients.map(string => 
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #40A4C8',
        padding: '5px',
        borderRadius: '5px'
      }}
    >{string} </span>);

    return <p>Ingredients: {ingredientsList}</p>;
  };

  return (
    <div className={OrderStyles.Order}>
      {renderIngredients()}
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong> </p>
    </div>
  );
}

export default Order;
