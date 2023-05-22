import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, func, btnTitle}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} func={func} btnTitle={btnTitle}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  func: PropTypes.func,
  btnTitle: PropTypes.string,
};

List.defaultProps = {
  func: () => {},
}

export default React.memo(List);
