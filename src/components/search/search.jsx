import React from 'react'
import './search.css'
import { Search as SearchIcon } from 'lucide-react';

function Search() {
  return (
    <div className='search-bar'>
        <input type="text" className='search-text' placeholder='Search' />
        <button type='submit'>
        <SearchIcon size={18} />
        </button>
    </div>
  )
}

export default Search;