import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../head";
import List from "../list";

function Modal({cart, isActive, setIsActive, onDeleteItem}) {
  const cn = bem('Modal');
  let sum = useMemo(() => {
    return cart.reduce((s, item) => s + item.count * item.price, 0);
  }, [cart]);

  return (
    <div className={isActive ? cn() + ' isActive' : cn()} onClick={() => setIsActive(false)}>
      <div className={cn('window')} onClick={(e) => e.stopPropagation()}>
        <div className={cn('header')}>
          <Head title='Корзина'/>
          <button onClick={() => setIsActive(false)}>Закрыть</button>
        </div>
        <List list={cart} func={onDeleteItem} btnTitle='Удалить'/>
        <div className={cn('footer')}>
          Итого: <span>{sum} ₽</span>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Modal.defaultProps = {
  setIsActive: () => {},
  onDeleteItem: () => {},
}

export default React.memo(Modal);
