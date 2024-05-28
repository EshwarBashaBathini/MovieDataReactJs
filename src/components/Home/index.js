import {useEffect, useState, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import NavBar from '../NavBar'
import MovieItem from '../MovieItem'

const Home = () => {
  const [isLoader, setLoader] = useState(true)
  const [popularList, setPopularList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(50)

  const getPopularMoviesURL = useCallback(async () => {
    const apiKey = 'de2e56ee2c3d11a151f8397711dc2530'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}}&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTJlNTZlZTJjM2QxMWExNTFmODM5NzcxMWRjMjUzMCIsInN1YiI6IjY2NGMyMzcxNjU4YmViMmIwNjk2NjQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.52qacHOZv8XdtamkAtjYhF4-6Muj1hlWICQv-1F7zpU',
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.results.map(item => ({
      id: item.id,
      name: item.title,
      posterPath: item.poster_path,
      rating: item.vote_average,
      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    }))
    setPopularList(updatedData)
    setLoader(false)
    setTotalPages(data.total_pages)
  }, [currentPage])
  useEffect(() => {
    getPopularMoviesURL()
  }, [getPopularMoviesURL])

  const getLoader = () => (
    <div className="div-loader">
      <Loader type="Oval" color="blue" width={30} height={30} />
    </div>
  )
  const onNextPage = () => {
    setCurrentPage(prevcurrentPage => prevcurrentPage + 1)
    getPopularMoviesURL()
  }
  const onPrevPage = () => {
    setCurrentPage(prevcurrentPage => prevcurrentPage - 1)
    getPopularMoviesURL()
  }
  const getPopularMovieItems = () => (
    <div className="bottom-container">
      <h1 className="head">Popular</h1>

      <ul className="unorder-Movies">
        {popularList.map(item => (
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
          className="button"
          onClick={onNextPage}
          type="button"
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <NavBar />
      {isLoader ? getLoader() : getPopularMovieItems()}
    </div>
  )
}

export default Home
