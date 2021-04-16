import React from 'react';
import Classes from './Order.css';
const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients){
        ingredients.push(
            {
                name:ingredientName,
                amount:props.ingredients[ingredientName]
            }
        )
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span key = {ig.name}> {ig.name}({ig.amount})</span>;
    });
    return(
        <div className = {Classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>Rs. {props.price}</strong></p>

        </div>
    );
}

export default Order;