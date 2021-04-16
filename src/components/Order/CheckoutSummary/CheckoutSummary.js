import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) =>{
    let ingredients = props.ingredients;
    return(
        <div className={classes.CheckoutSummary}>
            <h1>A Burger a day, keeps Slimness away</h1>
            <div className ={classes.Burger}> 
                <Burger ingredients = {ingredients} />
            </div>
            <Button 
            btnType = 'Danger'
            clicked = {props.checkoutCancelled}>Cancel</Button>
            <Button 
            btnType = 'Success'
            clicked = {props.checkoutProceeded}>Proceed</Button>
            
        </div>
    )
}

export default CheckoutSummary;