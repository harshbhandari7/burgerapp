import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../'
const ErrorHandler = (WrappedComponent) => {
    return (props) =>{
        return(
            <Aux>
                <Modal>
                    It Didn't work!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default ErrorHandler;