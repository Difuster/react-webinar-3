import {useCallback, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import Product from './product';
import Preloader from '../components/preloader';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const isPreloaderActive = useSelector(state => state.preloader.preloaderIsActive);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
        {isPreloaderActive && <Preloader />}
      </BrowserRouter>
    </>
  );
}

export default App;
