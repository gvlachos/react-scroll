import React from 'react';
import PropTypes from 'prop-types';

const Element = ({ id, content, found, onClick }) => (
  <li id={id} className={`item ${found ? 'found' : ''}`}>
    <button type='button' className='button' onClick={onClick}>
      <h2 className='title'>{content}</h2>
    </button>
  </li>
);

Element.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  found: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

Element.defaultProps = {
  found: false
};

export default Element;
