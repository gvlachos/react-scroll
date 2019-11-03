import React, { useState } from "react";
import Elements from "../Elements";

const BACKSPACE = "Backspace";

const searchList = (list, searchTerm, equals) => list.filter(current => equals(current.value, searchTerm));

const Dropdown = ({ list, equals }) => {
  const [visible, setVisible] = useState(false);
  const [showFirstElement, setShowFirstElement] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchResultList, setSearchResultList] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const dropdownContentClass = 'dropdown-content';

  const isValidKey = key => key === BACKSPACE || key.length === 1;
  const onBlur = ({ relatedTarget }) => {
    if (relatedTarget === null || !relatedTarget.classList.contains(dropdownContentClass)) {
      setSearch(null);
      setSearchResultList(null);
      setShowFirstElement(true);
      setVisible(false);
    }
  }
  const onClick = () => {
    setSearch(null);
    setSearchResultList(null);
    if (!visible) {
      setSearchResult(null);
      setShowFirstElement(false);
    }
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
      setSearchResultList(searchList(list, searchTerm, equals));
    } else {
      setSearchResultList(null);
    }
  };
  const onElementClick = element => {
    setSearchResult(element.value);
  };

  return (
    <div tabIndex='0' className="dropdown" onKeyUp={onKeyUp} onBlur={onBlur}>
      <button
        className={
          `dropbtn ${searchResultList && searchResultList.length > 0 ? 'withResult' : ''} ${search ? 'withSearchTerm' : ''}`
        }>
        <div className="title" onClick={onClick}>{visible && searchResult ? searchResult : 'Dropdown'}</div>
        {
          visible && !search
            ? <div className="searchTerm empty">type to search...</div>
            : visible && search
              ? <div className="searchTerm">{search}</div>
              : null
        }
      </button>
      <ul tabIndex='0' className={`${dropdownContentClass} ${visible ? "show" : ""}`}>
        <Elements
          list={list}
          searchResultList={searchResultList}
          showFirstElement={showFirstElement}
          onElementClick={onElementClick} />
      </ul>
    </div>
  );
};

export default Dropdown;
