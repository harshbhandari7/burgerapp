import React, {memo} from 'react';

import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    // componentWillUpdate () {
    
    // }
    return (
        <Auxi>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxi>
    )

}

export default memo(modal,
                    (prevProps, nextProps) => 
                    nextProps.show === prevProps.show && 
                    nextProps.children === prevProps.children
                );