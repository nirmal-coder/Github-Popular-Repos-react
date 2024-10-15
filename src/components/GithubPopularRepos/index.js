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

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    listOfPopularRepos: [],
    isLoading: true,
    isFetched: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true})
    const {activeTab} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeTab}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const updatedData = popularRepos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        listOfPopularRepos: updatedData,
        isLoading: false,
        isFetched: true,
      })
    }
  }

  changeTabFunction = activeTab => {
    this.setState({activeTab}, this.getData)
  }

  renderCardItems = () => {
    const {listOfPopularRepos} = this.state
    return (
      <ul className="card-container">
        {listOfPopularRepos.map(each => (
          <RepositoryItem obj={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderError = (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
    </div>
  )

  render() {
    const {activeTab, isLoading, isFetched} = this.state
    const renderData = isFetched ? this.renderCardItems() : this.renderError
    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Popular</h1>
          <ul className="tab-container">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                languageList={each}
                key={each.id}
                activeTab={activeTab}
                changeTabFunction={this.changeTabFunction}
              />
            ))}
          </ul>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            renderData
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
