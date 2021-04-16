import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


const burgerBuilder = props => {
    
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const {building, isAuthenticated , onInitIngredients,history, onSetAuthRedirectPath,onInitPurchase} = props; 

    useEffect(() => {
        if(building && isAuthenticated){
            history.push('/checkout')
        }
        else{
            onInitIngredients();
        }
    },[isAuthenticated ])
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true);
        }
        else{
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {   
        onInitPurchase(); 
        history.push('/checkout');
    }
    
    const burgerbuild = () =>{
        const {ings, onIngredientAdded, onIngredientRemoved, price} = props;
        const disabledInfo = {
            ...ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = <Spinner /> ;

        if(ings){
            burger = (
                <Auxi>
                    <Burger ingredients={ings} />
                    <BuildControls
                        ingredients = {ings}
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(ings)}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                        price={price} />
                </Auxi>
            )
            orderSummary =  <OrderSummary 
                ingredients={ings}
                price={price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler} />;
        }
        if(loading){
            orderSummary = <Spinner />;
        }
        let orderSummaryOfBurger ={
            burger:burger,
            orderSummary:orderSummary
        }
        return orderSummaryOfBurger;
    }
     
   let orderSummaryOfBurger = burgerbuild();
        return (
            <Auxi>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                   {orderSummaryOfBurger.orderSummary}
                </Modal>

                {orderSummaryOfBurger.burger}
                
            </Auxi>
        );   
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.order.error,
        isAuthenticated: state.auth.token !== null,
        building:state.burgerBuilder.building
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(burgerBuilder);