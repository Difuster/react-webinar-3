import React from 'react';
import PropTypes from 'prop-types';
import { currencyFormat } from "../../utils";

const Footer = ({sum}) => {
  return (
    <div className='Modal-footer'>
      Итого: <span>{currencyFormat.format(sum)}</span>
    </div>
  );
};

Footer.propTypes = {
  sum: PropTypes.number
};

export default Footer;
