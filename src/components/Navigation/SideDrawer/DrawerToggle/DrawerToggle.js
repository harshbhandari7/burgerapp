import React from 'react';

import classes from './DrawerToggle.css';

const DrawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>  
    </div>
);

export default DrawerToggle;