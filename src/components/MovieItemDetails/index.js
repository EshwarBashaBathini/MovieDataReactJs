import {useState, useEffect, useCallback} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

import NavBar from '../NavBar'
import CastItem from '../CastItem'

const MovieItemDetails = ({match}) => {
  const [movieData, setMovieData] = useState([])
  const [castList, setCastList] = useState([])
  const [isLoader, setisLoader] = useState(true)

  const {params} = match
  const {id} = params

  const topRatedMoviesURL = useCallback(async () => {
    const apiKey = 'de2e56ee2c3d11a151f8397711dc2530'
    const apiUrl1 = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const apiUrl2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTJlNTZlZTJjM2QxMWExNTFmODM5NzcxMWRjMjUzMCIsInN1YiI6IjY2NGMyMzcxNjU4YmViMmIwNjk2NjQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.52qacHOZv8XdtamkAtjYhF4-6Muj1hlWICQv-1F7zpU',
      },
    }
    const response1 = await fetch(apiUrl1, options)
    const data1 = await response1.json()
    const response2 = await fetch(apiUrl2, options)
    const data2 = await response2.json()

    const updatedData1 = {
      id: data1.id,
      name: data1.original_title,
      overview: data1.overview,
      imageUrl: `https://image.tmdb.org/t/p/w500${data1.poster_path}`,
      releaseDate: data1.release_date,
      rating: data1.vote_average,
      duration: data1.runtime,
      genres: data1.genres,
      budget: data1.budget,
      collections: data1.revenue,
    }
    setMovieData(updatedData1)
    const updatedData2 = data2.cast.map(item => ({
      originalName: item.original_name,
      profileImage: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
      castId: item.cast_id,
      charName: item.character,
    }))

    setCastList(updatedData2)
    setisLoader(false)
  }, [id])

  useEffect(() => {
    topRatedMoviesURL()
  }, [topRatedMoviesURL])

  const getLoader = () => (
    <div className="div-loader">
      <Loader type="Oval" color="blue" width={30} height={30} />
    </div>
  )
  const convertMinutesToHours = totalMinutes => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}m`
  }

  const getMovieAndCastDetails = () => (
    <div className="total-contanier">
      <div className="movie-details">
        <div className="MovieDetailsContainer">
          <img
            className="movie-img"
            src={movieData.imageUrl}
            alt={movieData.name}
          />
        </div>
        <div className="card-details">
          <p className="name">
            Title: <span className="span-value">{movieData.name}</span>
          </p>
          <p className="name">
            Overview: <span className="span-value">{movieData.overview}</span>
          </p>
          <p className="name">
            Duration:
            <span className="span-value">
              {convertMinutesToHours(movieData.duration)}
            </span>
          </p>
          <p className="name">
            Rating: <span className="span-value"> {movieData.rating}</span>
          </p>
          <p className="name">
            Release Date:
            <span className="span-value"> {movieData.releaseDate}</span>
          </p>
          <p className="name budget-li">
            Genres:
            <div className="span-value">
              <ul className="ul-genre">
                {movieData.genres.map(item => (
                  <li className="li-genre" key={item.id}>
                    {item.name},
                  </li>
                ))}
              </ul>
            </div>
          </p>
          <p className="name">
            Budget:
            <span className="span-value"> {movieData.budget}</span>
          </p>
          <p className="name">
            Collections:
            <span className="span-value">{movieData.collections}</span>
          </p>
        </div>
      </div>
      <h3 className="cast-head">Cast:</h3>
      <ul className="cast-ul">
        {castList.map(item => (
          <CastItem key={item.castId} details={item} />
        ))}
      </ul>
    </div>
  )

  return (
    <div>
      <NavBar />
      {isLoader ? getLoader() : getMovieAndCastDetails()}
    </div>
  )
}

export default withRouter(MovieItemDetails)
