import React, { Component } from 'react';
import ModalStyles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.purchasing !== this.props.purchasing || nextProps.children !== this.props.children;
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
