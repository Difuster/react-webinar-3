import React, {useState, useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";

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
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls cart={cart} setIsActive={setIsActive}/>
        <List list={list} func={callbacks.onAddItem} btnTitle='Добавить'/>
      </PageLayout>
      <Modal
        cart={cart}
        isActive={isActive}
        setIsActive={setIsActive}
        onDeleteItem={callbacks.onDeleteItem}
      />
    </>
  );
}

export default App;
