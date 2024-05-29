import {Link, withRouter} from 'react-router-dom'
import './index.css'
import SearchMovieContext from '../../context/SearchMovieContext'

const NavBar = props => {
  const getSearchBar = () => (
    <SearchMovieContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push('/search')
        }
        return (
          <div className="search-container">
            <input
              className="input"
              type="search"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <Link to="/search">
              <button
                className="search-btn"
                type="button"
                onClick={onSearchHandler}
              >
                Search
              </button>
            </Link>
          </div>
        )
      }}
    </SearchMovieContext.Consumer>
  )

  return (
    <div className="nav-container">
      <Link to="/" className="link">
        <h1 className="h1">movieDB</h1>
      </Link>
      <div className="unorder-2">
        <button type="button" className="nav-btn">
          <Link className="link" to="/">
            <h3>Popular</h3>
          </Link>
        </button>

        <button type="button" className="nav-btn">
          <Link className="link" to="/top-rated ">
            <h3>Top Rated</h3>
          </Link>
        </button>

        <button type="button" className="nav-btn">
          <Link className="link" to="/upcoming">
            <h3>Upcoming</h3>
          </Link>
        </button>
      </div>
      {getSearchBar()}
    </div>
  )
}

export default withRouter(NavBar)
