// src/components/SearchBar/SearchBar.js
import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
    const [term, setTerm]= useState('');

    const handleSearch = () => {
        if (term.trim()) {
          onSearch(term); // Pass the term to the search function
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch(); // Trigger search on Enter key
        }
      };
    
    const handleTermChange = (event) => {
        setTerm(event.target.value); // Update term state when user types
      };

  return (
    <div className="SearchBar">
      <input  type="text"
        placeholder="Enter A Song, Album, or Artist"
        value={term}
        onChange={handleTermChange}
        onKeyDown={handleKeyPress}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;