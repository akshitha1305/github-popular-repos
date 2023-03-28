// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {id, name, issuesCount, forksCount, starsCount, avatarUrl} = itemDetails

  return (
    <li className="repository-item" key={id}>
      <div className="img-head-container">
        <img src={avatarUrl} alt={name} className="repository-image" />
        <h1 className="heading-name">{name}</h1>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-img"
        />
        <p className="count-text">{starsCount}</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-img"
        />
        <p>{forksCount}</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-img"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
