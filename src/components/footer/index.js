import React from 'react';
import './style.css';

const Footer = ({pages, activePage, renderPages}) => {

  return (
    <>
      {renderPages(activePage, pages)}
    </>
  );
};

export default Footer;
