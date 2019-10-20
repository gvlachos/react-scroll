import React from "react";

const Element = ({ id, content }) => (
  <div id={id} className="item">
    {content}
  </div>
);

export default Element;
