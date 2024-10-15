import './index.css'

const RepositoryItem = props => {
  const {obj} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = obj
  return (
    <li className="card-item-container">
      <img src={avatarUrl} alt={name} />
      <h2>{name}</h2>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} stars</p>
      </div>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} stars</p>
      </div>
    </li>
  )
}

export default RepositoryItem
