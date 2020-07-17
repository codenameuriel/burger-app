import React, {Component} from 'react';
import ModalStyles from './Modal.module.css';
import BackdropContext from '../../../context/backdrop-context';

class Modal extends Component {
  static contextType = BackdropContext;

  render() {
    return (
      <div 
        className={ModalStyles.Modal} 
        style={{
          transform: this.context.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.context.purchasing ? '1' : '0'
        }}>
        {this.props.children}
      </div>
    );
  }
};

export default Modal;
