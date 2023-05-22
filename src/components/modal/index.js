import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({isActive, setIsActive, children}) {
  return (
    <div className={isActive ? 'Modal isActive' : 'Modal'} onClick={() => setIsActive(false)}>
      <div className='Modal-window' onClick={(e) => e.stopPropagation()}>
          {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
};

Modal.defaultProps = {
  setIsActive: () => {},
}

export default React.memo(Modal);
