import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoryData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
    apiStatusResult: apiStatus.initial,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {activeLanguageFilterId} = this.state

    this.setState({
      apiStatusResult: apiStatus.inProgress,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))

      this.setState({
        repositoryData: updatedData,
        apiStatusResult: apiStatus.success,
      })
    } else {
      this.setState({
        apiStatusResult: apiStatus.failure,
      })
    }
  }

  renderLoaderview = () => (
    <div data-testid="loader" className="loader-element">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getItems)
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="language-item-list">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            isActive={each.id === activeLanguageFilterId}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
            languagesItem={each}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItem = () => {
    const {repositoryData} = this.state

    return (
      <ul className="respository-items-list">
        {repositoryData.map(each => (
          <RepositoryItem key={each.id} itemDetails={each} />
        ))}
      </ul>
    )
  }

  renderRepository = () => {
    const {apiStatusResult} = this.state
    switch (apiStatusResult) {
      case apiStatus.success:
        return this.renderRepositoryItem()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoaderview()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
