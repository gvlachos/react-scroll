import React, { Fragment, useState, useMemo, useEffect } from "react";
import Element from "../Element";

const Elements = ({ list, searchResult }) => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    let element;
    let behavior;
    if (searchResult && searchResult.length) {
      element = document.getElementById(searchResult[0].key);
      behavior = "smooth";
      setCurrent(0);
    } else {
      element = document.getElementById(list[0].key);
      behavior = "auto";
      setCurrent(null);
    }
    element.scrollIntoView({ behavior });
  }, [list, searchResult]);


  const elements = useMemo(() => {
    return list.map(item => (
      <Element key={item.key} id={item.key} content={item.value} />
    ))
  }, [list]);

  const next = () => {
    const behavior = "smooth";
    let element;
    if (current === null || !searchResult || searchResult.length === 0) return;
    if (current < searchResult.length - 1) {
      element = document.getElementById(searchResult[current + 1].key);
      setCurrent(current + 1);
    } else {
      element = document.getElementById(searchResult[0].key);
      setCurrent(0);
    }
    element.scrollIntoView({ behavior });
  };

  return (
    <Fragment>
      {
        searchResult
        && current !== null
        && <div className="resultsCount" onClick={next}>{`${current + 1} / ${searchResult.length}`}</div>
      }
      {elements}
    </Fragment>
  );
};

export default Elements;
