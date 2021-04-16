import React, { useEffect } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const app = props => {
  const {onTryAutoSignup} = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
    
  
    let routes = (
      <Switch>
        <Route path = "/" exact render ={(props) => (<BurgerBuilder {...props}/>)} />
        <Route path = "/auth" component = {Auth} />
        <Redirect to = "/" />
      </Switch>
    );

    if(props.isAuthenticated){
      
      routes =(
        <Switch>
            
            <Route path = "/checkout"  render = {props => <Checkout {...props}/>} />
            <Route path = "/orders"  render = {props =><Orders {...props}/>} />
            <Route path = "/" exact render ={props => <BurgerBuilder {...props}/>} />
            <Route path = "/logout" component = {Logout} />
            <Redirect to = "/" />
          </Switch>

      );
    }
    return (
      <React.Fragment>
        <Layout>
          {routes}
        </Layout>
      </React.Fragment>
    );  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !==null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch (actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
