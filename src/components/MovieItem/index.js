import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {details} = props
  const {id, name, rating, imageUrl, posterPath} = details
  return (
    <li className="list-item">
      <img className="img" src={imageUrl} alt={posterPath} />
      <div className="padding">
        <h3 className="h3">{name}</h3>
        <div className="rating-container">
          <p className="rating">Rating: {rating}</p>
          <Link to={`/movie/${id}`}>
            <button className="view-button" type="button">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default MovieItem
