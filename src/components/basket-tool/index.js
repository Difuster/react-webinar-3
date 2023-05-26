import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen, dictionary}) {
  console.log(dictionary)
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/'>{dictionary.basketTool.home}</Link>
      <div>
        <span className={cn('label')}>{dictionary.basketTool.cartIs}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, dictionary.basketTool.amount)} / ${numberFormat(sum)} ₽`
            : dictionary.basketTool.empty
          }
        </span>
        <button onClick={onOpen}>{dictionary.buttons.follow}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
