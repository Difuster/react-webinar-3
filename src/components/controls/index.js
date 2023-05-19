import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {plural} from "../../utils";
import './style.css';

function Controls({cart, setIsActive}){
  const cn = bem('Controls');
  let sum = useMemo(() => {
    return cart.reduce((s, item) => s + item.count * item.price, 0);
  }, [cart])

  return (
    <div className={cn()}>
      <div className={cn('summary')}>
        <p>
          В корзине: 
          <span className={cn('value')}>
            {cart.length ?
            `${cart.length} ${plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${sum} ₽` :
            `пусто`}
          </span>
        </p>
      </div>
      <button onClick={() => setIsActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  setIsActive: PropTypes.func
};

Controls.defaultProps = {
  setIsActive: () => {},
}

export default React.memo(Controls);
