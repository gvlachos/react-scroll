import React from "react";

const Element = ({ id, content, onClick }) => (
  <div id={id} className="item" onClick={onClick}>
    {content}
  </div>
);

export default Element;
