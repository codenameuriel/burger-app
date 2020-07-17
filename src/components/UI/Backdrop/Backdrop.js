import React from 'react';
import BackdropStyles from './Backdrop.module.css';

const Backdrop = props => {
  return (
    props.purchasing ? <div className={BackdropStyles.Backdrop} onClick={props.closeModal}></div>: null
  );
}

export default Backdrop;
