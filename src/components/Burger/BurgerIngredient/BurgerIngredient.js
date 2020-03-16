import React from 'react';
import PropTypes from 'prop-types';
import './BurgerIngredient.css';

const burgerIngredient = (props) =>{
        let ingredient = null;
        switch (props.type){
            case ('bread-bottom'):
                ingredient = <div className={'BreadBottom'}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                <div className={'BreadTop'}>
                    <div className={'Seeds1'}></div>
                    <div className={'Seeds2'}></div>

                </div>
                )
                break;
            case ('meat'):
                ingredient =<div className={'Meat'}/>
                break;
            case ('cheese'):
                ingredient =<div className={'Cheese'}/>
                break;
            case ('salad'):
                ingredient =<div className={'Salad'}/>
                break;
            case ('bacon'):
                ingredient =<div className={'Bacon'}/>
                break;
            default:
                ingredient = null;
        }
        return ingredient;
};
burgerIngredient.propTypes = {
    type:PropTypes.string.isRequired
}
export default burgerIngredient;