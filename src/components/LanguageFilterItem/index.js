import './index.css'

const LanguageFilterItem = props => {
  const {languageList, activeTab, changeTabFunction} = props
  const {id, language} = languageList

  const callFunction = () => {
    changeTabFunction(id)
  }

  return (
    <li className={`${id === activeTab && 'activeTab'} tabItem-container `}>
      <button
        type="button"
        onClick={callFunction}
        className={id === activeTab ? 'btn' : ''}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
