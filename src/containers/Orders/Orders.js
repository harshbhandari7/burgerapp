import React , {useEffect} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
//import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const orders = props =>{
    const {token, userId, onFetchOrders, orders} = props;
    
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId])

    return(
        <div>
            {orders.map(order =>(
                <Order 
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price}/>
            
            ))}
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(orders);