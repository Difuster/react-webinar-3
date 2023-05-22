import React from 'react';
import PropTypes from 'prop-types';
import Head from "../head";

const Header = ({setIsActive}) => {
  return (
    <div className='Modal-header'>
      <Head title='Корзина'/>
      <button onClick={() => setIsActive(false)}>Закрыть</button>
    </div>
  );
};

Header.propTypes = {
  setIsActive: PropTypes.func
};

Header.defaultProps = {
  setIsActive: () => {},
}

export default Header;
