import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
const ingredient_prices = {
    salad:0.5,
    cheese:0.25,
    meat:1.5,
    bacon:1
}
class BurgerBuilder extends Component{
    state = {
        ingredients :{
            cheese:0    ,
            meat:0,
            bacon:0,
            salad:0,
        },
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
    }
    updatePurchaseState = (ingredients) => {
        
        const sum =  Object.keys(ingredients).map( ing =>{
            return ingredients[ing];}).reduce((sum, key) =>{
                return sum+key;
            },0);
        this.setState({purchaseable:sum>0});
        console.log(sum);
    }
  
    addIngredientHandler = (type) =>{
         const oldCount = this.state.ingredients[type];
         const updatedCount = oldCount+1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCount;
         const priceAddition = ingredient_prices[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice+priceAddition;

         this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
         this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) =>{
        
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction =  ingredient_prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () =>{
        //alert('Thank you!');
        const order ={
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
            user:{
                name:'SAM',
                address:'221 B Baker Street',
                country:'Italy',
                email:'user@gmail.com'
            },
            isPrimeUser:true
        }

        axios.post('/orders.json',order)
        .then(response => console.log(response));
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0  // checks if the value is less than 
                                                         // 0 or not and set bool value.
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary ingredient = {this.state.ingredients} 
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice}/>

                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler} 
                disabled = {disabledInfo}
                purchaseable = {this.state.purchaseable}
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}

                />
            </Aux>
        );
    }
}
export default BurgerBuilder;