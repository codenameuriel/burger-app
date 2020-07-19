import React, {Component} from 'react';
import ModalStyles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    //  only update, including order summary component if placing an order (button clicked)
    return nextProps.purchasing !== this.props.purchasing;
  }

  render() {
    return (
      <Aux>
        <Backdrop purchasing={this.props.purchasing} closeModal={this.props.closeModal}/>
        <div 
          className={ModalStyles.Modal} 
          style={{
            transform: this.props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.purchasing ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

export default Modal;
