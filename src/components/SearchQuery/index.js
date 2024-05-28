import Loader from 'react-loader-spinner'
import {useState} from 'react'
import MovieItem from '../MovieItem'
import './index.css'
import NavBar from '../NavBar'

import SearchMovieContext from '../../context/SearchMovieContext'

const SearchQuery = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPages] = useState(50)

  const renderEmpytView = () => (
    <div className="div-loader">
      <h1>No Results Found</h1>
      <p>Do Not get worried, Try to Search Again.</p>
    </div>
  )

  return (
    <SearchMovieContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value

        const renderLoadingView = () => (
          <div className="div-loader">
            <Loader type="Oval" color="blue" width={30} height={30} />
          </div>
        )
        const onNextPage = () => {
          setCurrentPage(prevcurrentPage => prevcurrentPage + 1)
          onTriggerSearchingQuery()
        }
        const onPrevPage = () => {
          setCurrentPage(prevcurrentPage => prevcurrentPage - 1)
          onTriggerSearchingQuery()
        }

        const renderMovielist = searchResponse1 => {
          const {results, totalPages} = searchResponse1
          console.log(searchResponse1)
          setTotalPages(totalPages)
          if (results === undefined) {
            return renderEmpytView()
          }
          console.log(results)
          return (
            <div className="bottom-container">
              <ul className="unorder-Movies">
                {results.map(item => (
                  <MovieItem key={item.id} details={item} />
                ))}
              </ul>
              <div className="pagination-container">
                <button
                  className="button"
                  onClick={onPrevPage}
                  type="button"
                  disabled={currentPage === 1}
                >
                  &lt; Prev
                </button>
                <span className="page-count">{currentPage}</span>
                <button
                  onClick={onNextPage}
                  type="button"
                  disabled={currentPage === totalPage}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          )
        }

        const renderSearchResultView = value1 => {
          const {apiStatus} = value1

          switch (apiStatus) {
            case 'IN_PROGESS':
              return renderLoadingView()
            case 'SUCCESS':
              return renderMovielist(searchResponse)
            default:
              return renderEmpytView()
          }
        }

        return (
          <>
            <NavBar />

            <div>{renderSearchResultView(value)}</div>
          </>
        )
      }}
    </SearchMovieContext.Consumer>
  )
}
export default SearchQuery
