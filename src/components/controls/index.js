import {memo} from "react";
import PropTypes from 'prop-types';
import { getDictionary } from "../../utils";
import './style.css';

function Controls({onAdd, language}){
  const dictionary = getDictionary(language);

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{dictionary.buttons.add}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
