import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара
   */
  addItem(item) {
    if(!this.state.cart.goodsCount) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          list: [...this.state.cart.list, {code: item.code, title: item.title, price: item.price, count: 1}],        
          goodsCount: 1,
          totalSum: this.state.cart.totalSum + item.price,
        },
      })
    } else {
      let product = this.state.cart.list.filter(prod => prod.code === item.code)[0];
      if (product) {
        this.setState({
          ...this.state,
          cart: {
            ...this.state.cart,
            list: this.state.cart.list.map(prod => {
              if (prod.code === product.code) {
                return {...prod, count: prod.count + 1};
              }
              return prod;
            }),
            totalSum: this.state.cart.totalSum + item.price,          
        }})
      } else {
        this.setState({
          ...this.state,
          cart: {
            ...this.state.cart,
            list: [...this.state.cart.list, {code: item.code, title: item.title, price: item.price, count: 1}],        
            goodsCount: this.state.cart.goodsCount + 1,
            totalSum: this.state.cart.totalSum + item.price,
          },
        })
      }
    }
  };

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        list: this.state.cart.list.filter(elem => elem.code !== item.code),
        goodsCount: this.state.cart.goodsCount - 1,
        totalSum: this.state.cart.totalSum - item.count * item.price
    }})
  };

  // /**
  //  * Выделение записи по коду
  //  * @param code
  //  */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? {...item, selected: false} : item;
  //     })
  //   })
  // }
}

export default Store;
