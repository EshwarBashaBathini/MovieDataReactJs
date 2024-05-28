import './App.css'
import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import MovieItemDetails from './components/MovieItemDetails'
import SearchQuery from './components/SearchQuery'
import SearchMovieContext from './context/SearchMovieContext'

// write your code here
const apiKey = 'de2e56ee2c3d11a151f8397711dc2530'
const App = () => {
  const [searchResponse, setsearchResponse] = useState({})
  const [apiStatus, setAPiStatus] = useState('INITAIL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: uuidv4(),
      imageUrl: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      rating: eachMovie.vote_average,
      name: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async () => {
    setAPiStatus('IN_PROGESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1`
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
    setsearchResponse(getUpdatedData(data))
    console.log(data)
    setAPiStatus('SUCCESS')
    setSearchInput('')
  }

  return (
    <SearchMovieContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={UpComing} />
        <Route exact path="/movie/:id" component={MovieItemDetails} />
        <Route exact path="/search" component={SearchQuery} />
      </Switch>
    </SearchMovieContext.Provider>
  )
}
export default App
