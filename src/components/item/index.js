import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { currencyFormat } from "../../utils";

function Item(props){
  const cn = bem('Item');

  const callbacks = {
    func: (e) => {
      e.stopPropagation();
      props.func(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>{currencyFormat.format(props.item.price)}</div>
      {props.item.count ? <div className={cn('count')}>{props.item.count} <span> шт</span></div> : null}
      <div className={cn('actions')}>
        <button onClick={callbacks.func}>
          {props.btnTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  func: PropTypes.func
};

Item.defaultProps = {
  func: () => {},
}

export default React.memo(Item);
