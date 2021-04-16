import React, {useEffect} from 'react';

import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
   
    // useEffect( () => {
    //     console.log('OrderSummary WillUpdate');
    // }, [])
    const summary = () => {
        return Object.keys(props.ingredients )
            .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li> );
        } );
    }
    
        const ingredientSummary = summary(); 
        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </Auxi>
        );
}


export default orderSummary;