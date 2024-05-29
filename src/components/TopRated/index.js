import {useEffect, useState, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Pagination from '../Pagination'
import NavBar from '../NavBar'
import MovieItem from '../MovieItem'

const TopRated = () => {
  const [isLoader, setLoader] = useState(true)
  const [topRatedList, settopRatedList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(50)

  const topRatedMoviesURL = useCallback(async () => {
    const apiKey = 'de2e56ee2c3d11a151f8397711dc2530'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}}&language=en-US&page=${currentPage}`
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
      posterPath: item.poster_path,
      name: item.title,
      rating: item.vote_average,
      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    }))
    settopRatedList(updatedData)
    setLoader(false)
    setTotalPages(data.total_pages)
  }, [currentPage])
  useEffect(() => {
    topRatedMoviesURL()
  }, [topRatedMoviesURL])

  const getLoader = () => (
    <div className="div-loader">
      <Loader type="Oval" color="blue" width={30} height={30} />
    </div>
  )

  const onNextPage = () => {
    setCurrentPage(prevcurrentPage => prevcurrentPage + 1)
    topRatedMoviesURL()
  }
  const onPrevPage = () => {
    setCurrentPage(prevcurrentPage => prevcurrentPage - 1)
    topRatedMoviesURL()
  }

  const getPopularMovieItems = () => (
    <div className="bottom-container">
      <h1 className="head">Top Rated</h1>

      <ul className="unorder-Movies">
        {topRatedList.map(item => (
          <MovieItem key={item.id} details={item} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  )

  return (
    <div>
      <NavBar />
      {isLoader ? getLoader() : getPopularMovieItems()}
    </div>
  )
}

export default TopRated
