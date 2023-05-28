import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Footer from '../../components/footer';
import { getDictionary } from "../../utils";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
    activePage: state.catalog.activePage,
    language: state.catalog.language,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const dictionary = getDictionary(select.language);

  useEffect(() => {
    store.actions.preloader.open();
    store.actions.catalog.getPagesCount();
    store.actions.catalog.load(0*10)
    .then(() => store.actions.preloader.close());
    
  }, []);

  useEffect(() => {
    store.actions.preloader.open();
    store.actions.catalog.load((select.activePage-1)*10)
    .then(() => store.actions.preloader.close());
  }, [select.activePage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка активной страницы
    setActivePage: useCallback(num => store.actions.catalog.setActivePage(num)),
    // Получение информации о продукте по id
    getProduct: useCallback(id => store.actions.catalog.getProduct(id)),
    // Установка языка приложения
    setLanguage: useCallback(language => store.actions.catalog.setLanguage(language)),
  }

  const renders = {
    item: useCallback((item, d) => {
      return <Item item={item} onAdd={callbacks.addToBasket} dictionary={d}/>
    }, [callbacks.addToBasket]),
    pages: useCallback((active, pagesArr) => {
      const key = active > 3 && active < pagesArr.length-2 ? 'rest' : active;
  
      const variants = {
        1: [active, 2, 3, '...', pagesArr.length],
        2: [1, active, 3, '...', pagesArr.length],
        3: [1, 2, active, 4, '...', pagesArr.length],
        [pagesArr.length]: [1, '...', pagesArr.length-2, pagesArr.length-1, active],
        [pagesArr.length-1]: [1, '...', pagesArr.length-2, active, pagesArr.length],
        [pagesArr.length-2]: [1, '...', pagesArr.length-3, active, pagesArr.length-1, pagesArr.length],
        rest: [1, '...', active-1, active, active+1, '...', pagesArr.length],
      }
      return (
        <div className='Footer'>
          {variants[key].map(item => {
            if(item === '...') {
              return (
                <span
                  key={Math.random(1000)}
                  className='Footer-item_ellipsis'
                >
                  {item}
                </span>
              )
            }
            return (
              <span
                key={item}
                className={item === active ? 'Footer-item_active' : 'Footer-item'}
                onClick={() => callbacks.setActivePage(item)}
              >
                {item}
              </span>
            )    
          })}
        </div>
      )
    })
  };

  return (
    <PageLayout>
      <Head title={dictionary.head.shop} onSetLanguage={callbacks.setLanguage} language={select.language}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} dictionary={dictionary}/>
      <List list={select.list} renderItem={renders.item} dictionary={dictionary}/>
      <Footer pages={select.pages} activePage={select.activePage} renderPages={renders.pages}/>
    </PageLayout>
  );
}

export default memo(Main);
