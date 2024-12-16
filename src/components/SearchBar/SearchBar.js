// src/components/SearchBar/SearchBar.js
import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
    const [term, setTerm]= useState('');

    const handleSearch= () => {
        if(term) {
            onSearch(term);
        }
    };
    const handleTermChange = (event) => {
        setTerm(event.target.value); // Update term state when user types
      };

  return (
    <div className="SearchBar">
      <input placeholder="Enter a song, album, or artist" 
      value={term}
      onChange={handleTermChange}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;