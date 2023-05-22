import React, {useState, useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";
import Footer from './components/modal/footer';
import Header from './components/modal/header';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isActive, setIsActive] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),

    onSetIsActive: useCallback(() => {
      setIsActive(true);
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} setIsActive={setIsActive}/>
      <List list={list} func={callbacks.onAddItem} btnTitle='Добавить'/>
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <Header setIsActive={setIsActive}/>
      <List list={cart.list} func={callbacks.onDeleteItem} btnTitle='Удалить'/>
      <Footer sum={cart.totalSum}/>
    </Modal>
    </PageLayout>
  );
}

export default App;
