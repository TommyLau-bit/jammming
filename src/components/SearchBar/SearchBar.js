// src/components/SearchBar/SearchBar.js
import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
    const [term, setTerm]= useState('');
    const handleSearch= () => {
        onSearch(term);
    }
    const handleTermChange = (event) => {
        setTerm(event.target.value); // Update term state when user types
      };
  return (
    <div className="SearchBar">
      <input placeholder="Enter a song, album, or artist" 
      onChange={handleTermChange}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;