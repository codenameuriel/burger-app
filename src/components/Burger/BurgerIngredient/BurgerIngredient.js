import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientStyles from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className={BurgerIngredientStyles.BreadBottom}></div>;
        break;
      case ('bread-top'):
        ingredient = (
          <div className={BurgerIngredientStyles.BreadTop}>
            <div className={BurgerIngredientStyles.Seeds1}></div>
            <div className={BurgerIngredientStyles.Seeds2}></div>
          </div>
        );
        break;
      case ('meat'):
        ingredient = <div className={BurgerIngredientStyles.Meat}></div>;
        break;
      case ('cheese'):
        ingredient = <div className={BurgerIngredientStyles.Cheese}></div>
        break;
      case ('salad'):
        ingredient = <div className={BurgerIngredientStyles.Salad}></div>
        break;
      case ('bacon'):
        ingredient = <div className={BurgerIngredientStyles.Bacon}></div>
        break;
      // handle incorrect type being passed in props
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  // chained condition 'isRequire' to throw error if type does not receive a value
  type: PropTypes.string.isRequired 
};

export default BurgerIngredient;
