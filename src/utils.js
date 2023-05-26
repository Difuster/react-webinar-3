/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const getDictionary = (language) => {
  const dictionary = {
    ru: {
      head: {
        shop: 'Магазин',
        cart: 'Корзина',
      },
      basketTool: {
        home: 'Главная',
        cartIs: 'В корзине:',
        empty: 'пусто',
        amount: {
          one:'товар',
          few:'товара',
          many:'товаров'
        },
      },
      descriptionBody: {
        country: 'Страна производитель',
        category: 'Категория',
        edition: 'Год выпуска',
        price: 'Цена',
      },
      cart: {
        total: 'Итого',
        piece: 'шт',
      },
      buttons: {
        add: 'Добавить',
        remove: 'Удалить',
        follow: 'Перейти',
        close: 'Закрыть',
      }
    },
    en: {
      head: {
        shop: 'Shop',
        cart: 'Cart',
      },
      basketTool: {
        home: 'Home',
        cartIs: 'Cart:',
        empty: 'is empty',
        amount: {
          one:'item',
          few:'items',
          many:'items'
        },
      },
      descriptionBody: {
        country: 'Country',
        category: 'Category',
        edition: 'Edition',
        price: 'Price',
      },
      cart: {
        total: 'Total',
        piece: 'pcs',
      },
      buttons: {
        add: 'Add',
        remove: 'Remove',
        follow: 'Follow',
        close: 'Close'
      }
    }
  }

  return dictionary[language];
}
