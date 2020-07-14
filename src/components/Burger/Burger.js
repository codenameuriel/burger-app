import React from 'react';
import BurgerStyles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  // const burgerIngredients = 
  //   Object.keys(props.ingredients).map(ingredient => {
  //     let arr = [];
  //     for (let i = 0; i < props.ingredients[ingredient]; i++) {
  //       arr.push(<BurgerIngredient key={ingredient + i} type={ingredient}/>);
  //     }
  //     return arr;
  //   });

  const burgerIngredients = 
    Object.keys(props.ingredients).map(ingredient => {
      // create array that represent the number value (amount of ingredient) for each key (ingredient) of the ingredients object (props.ingredients)
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
        return <BurgerIngredient key={ingredient + i} type={ingredient}/>;
      });
    });

  return (
    <div className={BurgerStyles.Burger}>
      <BurgerIngredient type='bread-top'/>
      {burgerIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default Burger;
