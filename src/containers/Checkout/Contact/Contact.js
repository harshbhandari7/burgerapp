import React, { useState } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './Contact.css';

import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

const contact = props =>{
    const [orderForm, setOrderForm] = useState({
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name Please',
                },
                value:'',
                validation: {
                    required:true,
                    },
                touched : false,
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street',
                },
                value:'',
                validation: {
                    required:true,
                    },
                validity: false,
                touched : false,
            },
            zip:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip code',
                },
                value:'',
                validation: {
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric:true,
                    },
                validity: false,
                touched : false,
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                },
                value:'',
                validation: {
                    required:true,
                    },
                validity: false,
                touched : false,
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-Mail',
                },
                value:'',
                validation: {
                    required:true,
                    isEmail:true,
                },
                validity: false,
                touched : false,
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest', },
                        {value:'normal', displayValue:'Normal', },
                        {value:'cheapest', displayValue:'Cheapest', },
                    ],
                    placeholder:'Delivery Method',
                },
            value:'',
            valid:true,
            },
        })
        const [formIsValid, setFormIsValid] = useState(false)
        //const [loading, setLoading] = useState(false)
    
    const orderHandler = (event) =>{
        event.preventDefault();
        const formData ={};
        const form = orderForm;
        for(let key in form){
            formData[key] = form[key].value; 
        }

        const {ings, price, token, userId} = props;
        const order ={
            ingredients: ings,
            price: price,
            orderData: formData,
            userId:userId,    
        }
        props.onOrderBurger(order, token);
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules){
            return true
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;          //trim() removes whitespaces.
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        const formData = {...orderForm}; //here I have created a new var from the orderform.
        const formElement = {...formData[inputIdentifier]}
        formElement.value = event.target.value;
        formElement.valid = checkValidity(formElement.value, formElement.validation);
        formElement.touched = true;
        formData[inputIdentifier] = formElement;
        let formIsValid = true;
        for (let key in formData){
            formIsValid = formData[key].valid && formIsValid;
        }

        setOrderForm(formData) 
        setFormIsValid(formIsValid)
    }
        const formElementArray = [];
        
        for (let key in orderForm){
            formElementArray.push({
                id:key,
                config:orderForm[key]
            });
        }

        return(
            <div className={classes.Contact}>
                <h5>Enter you Details</h5>
                <form onSubmit = {orderHandler}>
                    {formElementArray.map(ele => 
                        { 
                            const {config} =ele;
                            return(
                                <Input
                                    key = {ele.id} 
                                    fieldError = {ele.id}
                                    elementType = {config.elementType}
                                    elementConfig = {config.elementConfig}
                                    value = {config.value}
                                    invalid = {!config.valid}  //opposite cause we are providing invalid prop
                                    shouldValidate = {config.validation}
                                    touched = {config.touched}
                                    changed = {(event) =>inputChangeHandler(event, ele.id)}/>
                                ) 
                            }
                        )
                    }
                    <Button 
                        btnType  = 'Success'
                        disabled = {!formIsValid}>Place Order</Button>
                </form>
            </div>
        );
}


const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,

    }
    
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
    
}
export default connect(mapStateToProps,mapDispatchToProps)(contact);