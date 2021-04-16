import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';


const auth = props =>{
    
    const [controls, setControls] = useState({
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'E-Mail Address',
            },
            value:'',
            validation: {
                required:true,
                isEmail:true,
                },
            touched : false,
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'Password',
            },
            value:'',
            validation: {
                required:true,
                minLength:6,
                },
            touched : false,
        },
    });
    const [isSignup, setIsSignup] = useState(true);
    
    const {buildingBurger, onSetAuthRedirectPath} = props;
    useEffect(() => {
        if(!buildingBurger && props.authRedirect !== '/' ){
            onSetAuthRedirectPath();
        }
    }, [buildingBurger,props.authRedirect, onSetAuthRedirectPath])
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

        return isValid;
    }

    const inputChangeHandler = (event, controlName) => {
        //const {controls} = state;
        const updatedControls = {
            ...controls,
            [controlName]:{
                ...controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value, controls[controlName].validation),
                touched:true,

            }
        };
        setControls(updatedControls);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);

    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    const formElementArray = [];    
    for (let key in controls){
        formElementArray.push({
            id:key,
            config:controls[key]
        });
    }
    const form = formElementArray.map(formElement => {
    const {config} = formElement;
        
        return(
            <Input
                key = {formElement.id}
                fieldError = {formElement.id}
                elementType = {config.elementType}
                elementConfig = {config.elementConfig}
                value = {config.value}
                invalid = {!config.valid}  //opposite cause we are providing invalid prop
                shouldValidate = {config.validation}
                touched = {config.touched}
                changed = {(event) =>inputChangeHandler(event, formElement.id)}/>
        
        )
    })
        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect = <Redirect to = {props.authRedirectPath} />
        }
        return(
            
            <div className = {classes.Auth}>
                <label className ={classes.Label}>{isSignup ? ' SIGN UP' : ' SIGN IN'}</label>
                {authRedirect}
                <form onSubmit = {submitHandler}>
                    {form}
                    <Button btnType = "Success" >SUBMIT</Button>
                </form>
                {/*<p><strong>If Already Regisetered Please Sign In!!</strong></p>*/}
                <Button
                    clicked = {switchAuthModeHandler}
                    btnType = "Danger">SWITCH TO{isSignup ? ' SIGN IN' : ' SIGN UP'}</Button>
            </div>
        );
}


const mapStateToProps = state => {
    //console.log(state);
    return {
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);