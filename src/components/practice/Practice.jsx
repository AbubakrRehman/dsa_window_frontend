import React from 'react'
import SearchSortFilter from '../SearchSortFilter/SearchSortFilter'
import { filterByItems } from "../UserQuestionsPage/constants";

function Practice() {

  const handleSearch = (formData) => {
    console.log("search hua h", formData);
  }

  return (
    <SearchSortFilter onSearchWithFilters={handleSearch} filterByItems={filterByItems}/>
  )
}

export default Practice