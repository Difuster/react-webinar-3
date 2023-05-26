import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { getDictionary } from "../../utils";


function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.catalog.language,
  }));

  const dictionary = getDictionary(select.language);

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} closeModal={callbacks.closeModal} onRemove={callbacks.removeFromBasket} dictionary={dictionary}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={dictionary.head.cart} onClose={callbacks.closeModal} dictionary={dictionary}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} dictionary={dictionary}/>
    </ModalLayout>
  );
}

export default memo(Basket);
