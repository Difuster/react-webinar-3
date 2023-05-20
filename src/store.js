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
    if(!this.state.cart.length) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: item.code, title: item.title, price: item.price, count: 1}]
      })
    } else {
      let product = this.state.cart.filter(prod => prod.code === item.code)[0];
      if (product) {
        this.setState({
          ...this.state,
          cart: this.state.cart.map(prod => {
            if (prod.code === product.code) {
              return {...prod, count: prod.count + 1};
            }
            return prod;
          })
        })
      } else {
        this.setState({
          ...this.state,
          cart: [...this.state.cart, {code: item.code, title: item.title, price: item.price, count: 1}]
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
      cart: this.state.cart.filter(elem => elem.code !== item.code)
    })
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
