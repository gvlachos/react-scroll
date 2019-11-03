import React from "react";

const Element = ({ id, content, found, onClick }) => (
  <li id={id} className={`item ${found ? 'found' : ''}`} onClick={onClick}>
    {content}
  </li>
);

export default Element;
