import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredient).map(igKey => {
    return (
    <li key={igKey}>
        <span style={{textTransform:"capitalize"}}>
        {igKey}</span>:     
        {props.ingredient[igKey]}</li>);
    });
    return(
        <Aux>
            <h3>Order Deatails </h3>
            <ul>
                {ingredientSummary}
            </ul>
            <strong><p>Total Price : {props.price}</p></strong>
            <p>Continue to Checkout</p>
            <Button clicked = {props.purchaseCancelled} btnType = "Danger">CANCEL</Button>
            <Button clicked = {props.purchaseContinued} btnType = "Success">COTINUE</Button>

        </Aux>
    );
}

export default OrderSummary;