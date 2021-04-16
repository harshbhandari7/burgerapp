import React, { useState } from 'react';
import {connect} from 'react-redux';


import Auxi from '../Auxi/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawer, setSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawer(!sideDrawer);
    }
    return (
        <Auxi>
            <Toolbar 
                isAuth = {props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth = {props.isAuthenticated}
                open={sideDrawer}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxi>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);