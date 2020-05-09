import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Elements from '../Elements';

const BACKSPACE = 'Backspace';

const searchList = (list, searchTerm, equals) => list.filter(current => equals(current.value, searchTerm));

const Dropdown = ({ list, equals }) => {
  const [visible, setVisible] = useState(false),
    [showFirstElement, setShowFirstElement] = useState(false),
    [search, setSearch] = useState(null),
    [searchResultList, setSearchResultList] = useState(null),
    [searchResult, setSearchResult] = useState(null),
    dropdownButtonClass = 'dropbtn',
    dropdownContentClass = 'dropdown-content',
    isValidKey = key => key === BACKSPACE || key.length === 1,
    onBlur = ({ relatedTarget }) => {
      if (relatedTarget !== null
        && (
          relatedTarget.classList.contains(dropdownButtonClass)
          || relatedTarget.classList.contains(dropdownContentClass)
        )
      ) {
        return;
      }
      setSearch(null);
      setSearchResultList(null);
      setShowFirstElement(true);
      setVisible(false);
    },
    onClick = () => {
      setSearch(null);
      setSearchResultList(null);
      if (!visible) setSearchResult(null);
      setShowFirstElement(visible);
      setVisible(!visible);
    },
    onKeyUp = ({ key }) => {
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
    },
    onElementClick = element => {
      setSearchResult(element.value);
    };

  return (
    <div tabIndex='0' className="dropdown" onKeyUp={onKeyUp} onBlur={onBlur}>
      <button
        tabIndex='0'
        className={
          `${dropdownButtonClass} ${searchResultList && searchResultList.length > 0 ? 'withResult' : ''} ${search ? 'withSearchTerm' : ''}`
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
      <ul tabIndex='0' className={`${dropdownContentClass} ${visible ? 'show' : ''}`}>
        <Elements
          list={list}
          searchResultList={searchResultList}
          showFirstElement={showFirstElement}
          onElementClick={onElementClick} />
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  equals: PropTypes.func.isRequired
};

export default Dropdown;
