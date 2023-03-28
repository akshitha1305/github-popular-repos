// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languagesItem, isActive, setActiveLanguageFilterId} = props
  const {language, id} = languagesItem

  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }
  return (
    <li key={id}>
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
