import list from "../../components/list";
import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pages: [1],
      activePage: 1,
      language: 'ru',
    }
  }

  async load(skip) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getPagesCount() {
    const response = await fetch('/api/v1/articles?limit=1000');
    const json = await response.json();
    let pagesArr = [];
    for (let i = 1; i <= (Math.ceil(json.result.items.length / 10)); i++) pagesArr.push(i);
    this.setState({
       ...this.getState(),
       pages: pagesArr
    }, 'Получено общее количество страниц');
  }

  async getProductData(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    return json;
  }

  setLanguage(language) {
    this.setState({
      ...this.getState(),
      language: language
   }, 'Язык изменен');
  }

  setActivePage(num) {
    this.setState({
      ...this.getState(),
      activePage: num
   }, 'Обновлена активная страница');
  }
}

export default Catalog;
