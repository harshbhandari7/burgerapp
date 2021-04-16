import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients:null,
    totalPrice:15,
    error:false,
    building:false,
}
const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 50,
    bacon: 25,
};


const reducer = (state = intialState,action) => {
    const {ingredients, totalPrice} = state;
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            
            if(ingredients[action.ingredientName] >= 3){
                return{
                    ...state,
                    ingredients:{
                        ...ingredients,
                    }
                }
            }
            return{
                ...state,
                ingredients:{
                    ...ingredients,
                    [action.ingredientName]: ingredients[action.ingredientName] + 1
                },
                totalPrice:totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true,
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...ingredients,
                    [action.ingredientName]: ingredients[action.ingredientName] - 1
                },
                totalPrice:totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true,

            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice:15,
                error:false,
                building:false,    
            };
        case actionTypes.CANCEL_CHECKOUT:
            return{
                ...state,
                building:false,
            }
        default:
            return state;
    }
};

export default reducer;