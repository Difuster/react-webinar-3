import React, { useEffect, memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import ProductBody from '../../components/product-body';
import { getDictionary } from "../../utils";

const Product = () => {
  const store = useStore();
  const {id} = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.catalog.language,
  }));

  const dictionary = getDictionary(select.language);
  

  useEffect(() => {
    store.actions.catalog.getProductData(id)
    .then(data => setProduct(data.result))
  }, []);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setLanguage: useCallback(language => store.actions.catalog.setLanguage(language)),
  }


  return (
    <>
      {
        product ?
          <PageLayout>
            <Head title={product.title} onSetLanguage={callbacks.setLanguage} language={select.language}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} dictionary={dictionary}/>
            <ProductBody product={product} onAdd={callbacks.addToBasket} dictionary={dictionary}/>
          </PageLayout>
          : 
          null}
    </>
  );
};

export default Product;
