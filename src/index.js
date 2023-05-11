import React from 'react';
import {createRoot} from 'react-dom/client';
import {uniqueID} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: uniqueID(), title: 'Название элемента', viewsCount: 0},
    {code: uniqueID(), title: 'Некий объект', viewsCount: 0},
    {code: uniqueID(), title: 'Заголовок', viewsCount: 0},
    {code: uniqueID(), title: 'Очень длинное название элемента из семи слов', viewsCount: 0},
    {code: uniqueID(), title: 'Запись', viewsCount: 0},
    {code: uniqueID(), title: 'Шестая запись', viewsCount: 0},
    {code: uniqueID(), title: 'Седьмая запись', viewsCount: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
