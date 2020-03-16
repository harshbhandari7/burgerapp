import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{
    let newIngredients = Object.keys(props.ingredients).map(igKey => {
            return  [...Array(props.ingredients[igKey])].map((_,i) =>{
                return <BurgerIngredient key ={igKey+i} type = {igKey} />;
        });
    })
    .reduce((arr, ele) => {
        return arr.concat(ele)
    },[]);
    if (newIngredients.length === 0){
        newIngredients = <p> Start adding Ingredients </p>
    }
   // console.log(newIngredients);
    return(
        <div className={'Burger'}>
            <BurgerIngredient type= "bread-top"/>
            {newIngredients}
            <BurgerIngredient type= "bread-bottom"/>
        </div>
    );
};
export default burger;