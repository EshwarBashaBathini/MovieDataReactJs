import React from 'react'

const SearchMovieContext = React.createContext({
  searchResponse: '',
  onChangeSearchQuery: () => {},
})

export default SearchMovieContext
