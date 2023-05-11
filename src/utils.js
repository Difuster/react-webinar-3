const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Генерация уникального ID
 */

function generateUniqueID() {
  let counter = 0;
  return function() {
    return ++counter;
  }
}
export const uniqueID = generateUniqueID();

/**
 * Склонение существительных
 */

export function inflectNouns(num, singular, twoThreeFour, plural) {
  const stringFromNumber = num.toString();
  const lastIndex = stringFromNumber[stringFromNumber.length - 1];

  if (num >= 5 && num <=20) {
    return `${num} ${plural}`;
  }

  if(lastIndex === '1') {
    return `${num} ${singular}`;
  }

  if(lastIndex === '2' || lastIndex === '3' || lastIndex === '4') {
    return `${num} ${twoThreeFour}`;
  }

  return `${num} ${plural}`;
}
