import React from 'react';
import BurgerStyles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let burgerIngredients = 
    Object.keys(props.ingredients).map(ingredient => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
        return <BurgerIngredient key={ingredient + i} type={ingredient}/>;
      });
    }).reduce((acc, currEl) => {
        return acc.concat(currEl);
    }, []);

  if (burgerIngredients.length === 0) {
    burgerIngredients = <p>Please start adding ingredients!</p>;
  } 

  return (
    <div className={BurgerStyles.Burger}>
      <BurgerIngredient type='bread-top'/>
      {burgerIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default Burger;
