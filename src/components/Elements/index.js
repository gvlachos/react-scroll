import React, { Fragment, useState, useMemo, useEffect } from "react";
import Element from "../Element";

const Elements = ({ list, searchResultList, showFirstElement, onElementClick }) => {
  const [current, setCurrent] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  // initialize and show the first element in the result
  // or the first element in the list
  useEffect(() => {
    let behavior = "auto";
    let current = null;
    let elementId = list[0].key;
    if (!showFirstElement && searchResultList && searchResultList.length) {
      elementId = searchResultList[0].key;
      behavior = "smooth";
      current = 0;
    }
    setCurrent(current);
    setSelectedElement({ elementId, behavior });
  }, [list, searchResultList, showFirstElement]);

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
      const isElementFound = searchResultList && searchResultList.some(current => current.key === item.key);
      const onClick = () => onElementClick(item);
      return (
        <Element
          key={item.key}
          id={item.key}
          content={item.value}
          found={isElementFound}
          onClick={onClick}
        />
      )
    })
  }, [list, searchResultList]);

  // handler to find the next element in the result
  const next = () => {
    const behavior = "smooth";
    let elementId;
    if (current === null || !searchResultList || searchResultList.length === 0) return;
    if (current < searchResultList.length - 1) {
      elementId = searchResultList[current + 1].key;
      setCurrent(current + 1);
      setSelectedElement({ elementId, behavior });
    } else {
      elementId = searchResultList[0].key;
      setCurrent(0);
      setSelectedElement({ elementId, behavior });
    }
  };

  return (
    <Fragment>
      {
        searchResultList
        && searchResultList.length
        && current !== null
        && <div
          className="resultsCount"
          onClick={next}
        >
          {`${current + 1} / ${searchResultList.length}`}
        </div>
      }
      {elements}
    </Fragment>
  );
};

export default Elements;
