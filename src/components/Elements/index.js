import React, { Fragment, useState, useMemo, useEffect } from "react";
import Element from "../Element";

const Elements = ({ list, searchResult, onElementClick }) => {
  const [current, setCurrent] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  // initialize and show the first element in the result
  // or the first element in the list
  useEffect(() => {
    let behavior;
    let elementId;
    if (searchResult && searchResult.length) {
      elementId = searchResult[0].key;
      behavior = "smooth";
      setCurrent(0);
    } else {
      elementId = list[0].key;
      behavior = "auto";
      setCurrent(null);
    }
    setSelectedElement({ elementId, behavior });
  }, [list, searchResult]);

  // scroll the selected element into view
  useEffect(() => {
    if (selectedElement) {
      document.getElementById(selectedElement.elementId).scrollIntoView({
        behavior: selectedElement.behavior
      });
    }
  }, [selectedElement])

  // list of elements in the dropdown
  const elements = useMemo(() => {
    return list.map(item => {
      const onClick = () => onElementClick(item);
      return (
        <Element
          key={item.key}
          id={item.key}
          content={item.value}
          onClick={onClick}
        />
      )
    })
  }, [list]);

  // handler to find the next element in the result
  const next = () => {
    const behavior = "smooth";
    let elementId;
    if (current === null || !searchResult || searchResult.length === 0) return;
    if (current < searchResult.length - 1) {
      elementId = searchResult[current + 1].key;
      setCurrent(current + 1);
      setSelectedElement({ elementId, behavior });
    } else {
      elementId = searchResult[0].key;
      setCurrent(0);
      setSelectedElement({ elementId, behavior });
    }
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
