import './index.css'

const CastItem = props => {
  const {details} = props
  const {charName, originalName, profileImage} = details
  console.log(details)
  return (
    <li className="cast-listitem">
      <img className="cast-img" src={profileImage} alt={originalName} />
      <p className="cast-org-name">
        Name:
        <span className="cast-span">{originalName}</span>
      </p>
      <p className="cast-org-name">
        Character Name:
        <span className="cast-span">{charName}</span>
      </p>
    </li>
  )
}

export default CastItem
