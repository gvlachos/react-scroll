import React, { useState } from "react";
import Elements from "../Elements";

const BACKSPACE = "Backspace";

const searchList = (list, searchTerm, equals) => list.filter(current => equals(current.value, searchTerm));

const Dropdown = ({ list, equals }) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const isValidKey = key => key === BACKSPACE || key.length === 1;
  const onClick = () => {
    setSearch(null);
    setSearchResult(null);
    setVisible(!visible);
  }
  const onKeyUp = ({ key }) => {
    let searchTerm = search;

    if (!visible) return;
    if (search === null && key === BACKSPACE) return;
    if (!isValidKey(key)) return;

    if (search === null) {
      searchTerm = key;
    } else if (key === BACKSPACE) {
      searchTerm = search.slice(0, -1);
    } else {
      searchTerm = search + key;
    }

    setSearch(searchTerm);
    if (searchTerm) {
      setSearchResult(searchList(list, searchTerm, equals));
    } else {
      setSearchResult(null);
    }
  };
  const onElementClick = element => {
    console.log(`clicked ${element.value}`);
    setSearch(null);
    setSearchResult(null);
    setVisible(false);
  };

  return (
    <div className="dropdown" onKeyUp={onKeyUp}>
      <button
        className={
          `dropbtn ${searchResult && searchResult.length > 0 ? 'withResult' : ''} ${search ? 'withSearchTerm' : ''}`
        }>
        <div className="title" onClick={onClick}>Dropdown</div>
        {
          visible && !search
            ? <div className="searchTerm empty">type to search...</div>
            : visible && search
              ? <div className="searchTerm">{search}</div>
              : null
        }
      </button>
      <div className={`dropdown-content ${visible ? "show" : ""}`}>
        <Elements
          list={list}
          searchResult={searchResult}
          firstElement={list[0]}
          onElementClick={onElementClick} />
      </div>
    </div >
  );
};

export default Dropdown;
