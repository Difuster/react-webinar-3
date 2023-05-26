import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onSetLanguage, language}){
  const callbacks = {
    onSetLanguage: (e) => onSetLanguage(e.target.dataset.lang),
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-languages'>
        <span className={language === 'ru' ? 'Head-language_active' : 'Head-language'} data-lang='ru' onClick={callbacks.onSetLanguage}>RU</span>
        <span className={language === 'en' ? 'Head-language_active' : 'Head-language'} data-lang='en' onClick={callbacks.onSetLanguage}>EN</span>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
