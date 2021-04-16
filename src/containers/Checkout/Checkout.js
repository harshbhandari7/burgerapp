import React  from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact'; 
import * as actions from '../../store/actions/index';


const checkout = props => {
    const {building, history, ings, purchased} = props;

    const checkoutCancelledHandler = () => {
        props.onCancelCheckout();
        if(!building){
            history.goBack('/');
        }
    }
    const checkoutProceededHandler = () => {
        history.replace('/checkout/contact');
    }
    
    let summary = <Redirect to = "/" />;

    if(ings){
        const purchasedRedirect = purchased ? <Redirect to ="/orders"/>: null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients = {ings}
                    checkoutCancelled = {checkoutCancelledHandler}
                    checkoutProceeded = {checkoutProceededHandler} />
                <Route 
                path = {props.match.path + '/contact'} 
                component = {Contact} />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased,
        building:state.burgerBuilder.building,
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onCancelCheckout: () => dispatch(actions.cancelCheckout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(checkout);

