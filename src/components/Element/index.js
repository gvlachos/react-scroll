import React from "react";

const Element = ({ id, content, onClick }) => (
  <li id={id} className="item" onClick={onClick}>
    {content}
  </li>
);

export default Element;
