import StoreModule from "../module";

class Modals extends StoreModule {

  initState() {
    return {
      preloaderIsActive: false
    }
  }

  open(){
    this.setState({preloaderIsActive: true}, 'Идет загрузка данных');
  }

  close(){
    this.setState({preloaderIsActive: false}, 'Загрузка данных закончена');
  }
}

export default Modals;
