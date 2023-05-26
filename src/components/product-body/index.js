import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const ProductBody = ({product, onAdd, dictionary}) => {
  const cn = bem('ProductBody');

  const callbacks = {
    onAdd: (e) => onAdd(product._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {product.description}
      </div>
      <div className={cn('specific')}>
        {dictionary.descriptionBody.country}: <b>{product.madeIn.title}</b>
      </div>
      <div className={cn('specific')}>
        {dictionary.descriptionBody.category}: <b>{product.category.title}</b>
      </div>
      <div className={cn('specific')}>
        {dictionary.descriptionBody.edition}: <b>{product.edition}</b>
      </div>
      <div className={cn('price')}>
        {dictionary.descriptionBody.price}: {product.price}
      </div>
      <button onClick={callbacks.onAdd}>{dictionary.buttons.add}</button>
    </div>
  );
};

export default ProductBody;
