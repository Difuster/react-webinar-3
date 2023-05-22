import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {plural} from "../../utils";
import './style.css';
import { currencyFormat } from "../../utils";

function Controls({cart, setIsActive}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('summary')}>
        <p>
          В корзине: 
          <span className={cn('value')}>
            {cart.goodsCount ?
            `${cart.goodsCount} ${plural(cart.goodsCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${currencyFormat.format(cart.totalSum)}` :
            `пусто`}
          </span>
        </p>
      </div>
      <button onClick={() => setIsActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })),
    googsCount: PropTypes.number,
    totalSum: PropTypes.number,
  }).isRequired,
  setIsActive: PropTypes.func
};

Controls.defaultProps = {
  setIsActive: () => {},
}

export default React.memo(Controls);
