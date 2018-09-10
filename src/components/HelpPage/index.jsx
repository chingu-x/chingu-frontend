import * as React from 'react';
import PropTypes from "prop-types"
import { HelpQA } from './help-qa.data';
import ReactMarkdown from "react-markdown";
import './Help.css';

// const mapStringtoFragments = str =>
//   str.split('\n')
//     .map((item, key) =>
//       <React.Fragment key={key}>
//         {item}<br />
//       </React.Fragment>
//     )

class ExpansionPanel extends React.Component {
  static propTypes = {
    multi: PropTypes.bool, // Allows multiple open items
    defaultOpen: PropTypes.bool,// Opens all items by default (use with eg search filtered list)
    list: PropTypes.arrayOf(list => {
      if (!list.every(item => item.props.children.length === 2)) {
        return new Error(`ExpansionPanel expects its list prop item to 
        contain 2 children (First is used as a clickable panel label.)`)
      }
      if (!list.every(item => item.key)) {
        return new Error(`ExpansionPanel requires unique key prop 
        on children of its list prop element`)
      }
    }).isRequired
  }

  static defaultProps = {
    multi: false,
    defaultOpen: false
  }

  static getDerivedStateFromProps({ defaultOpen, list }) {
    if (defaultOpen) return { keys: list.map(item => item.key) }
    else return { keys: [] }
  }

  handleClick = key => {
    const { keys } = this.state

    if (this.props.multi) {
      this.setState({
        keys: keys.includes(key)
          ? keys.filter(stateKey => stateKey !== key)
          : [...keys, key]
      })
    }

    else this.setState({ keys: keys.includes(key) ? [] : [key] })
  }

  render() {
    return (
      <div className={this.props.className}>
        {
          this.props.list.map(listItem => {
            const [label, content] = listItem.props.children
            return (
              <React.Fragment key={listItem.key}>
                <div
                  onClick={() => this.handleClick(listItem.key)}>
                  {label}
                </div>
                {this.state.keys.includes(listItem.key) && content}
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

// -- EXPORT -- //
class HelpPage extends React.Component {
  state = { search: [] }
  static getDerivedStateFromProps({ location, match }) {
    const queryParams = new URLSearchParams(location.search);
    return { search: decodeURIComponent(queryParams.get('search')) || match.params.searchTerm }
  }

  renderQuestions = list => (
    list.map(({ question, answer }) => {
      return (
        <React.Fragment key={question}>
          <div className="QA-question">{question}</div>
          {/* <div className="QA-answer">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div> */}
          <div className="QA-answer">
            {answer}
          </div>
        </React.Fragment>
      )
    })
  )

  renderCategories = list =>
    list.map((item, idx) =>
      <React.Fragment key={idx}>
        <div className="QA-title__outer">
          <div className="QA-title__inner">
            {item.category}
            <i className="fas fas fa-chevron-down" />
          </div>
        </div>
        <ExpansionPanel
          className="expansion-section"
          list={this.renderQuestions(item.qa_set)} />
      </React.Fragment>)

  filteredQA = (list, search) => {
    // Cleanup search inputs
    search = search.toLowerCase().split(" ")
      .reduce((search, term) =>
        !!term.trim() ?
          [...search, term.trim()]
          : search, [])

    const stringIncludes = (str, search) => search.every(term => str.toString().toLowerCase().includes(term))
    const filterQA = (list, search) => list.filter(qa =>
      stringIncludes(qa.question, search) || stringIncludes(qa.answer, search))

    const filtered = (list, search) => list.reduce((reduced, { category, qa_set }) => {
      const qa = filterQA(qa_set, search)
      if (/*stringIncludes(category, search) || */ !!qa.length) {
        reduced.push({ category, qa_set: qa })
      }
      return reduced
    }, [])

    if (!search) return list
    const filteredList = filtered(list, search)
    return filteredList
  }

  render() {
    const { search } = this.state
    return (
      <div className="help-page--container" >
        <div className="help-banner" />
        <div className="help-container">
          {/* <div className="help-background-color" /> */}
          <div className="help-search-title">How can we help you?</div>
          <input
            className="help-search-bar"
            type="search"
            placeholder="Search Help"
            value={search || ""}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <ExpansionPanel
            defaultOpen={!!search}
            className="help-QA__container"
            list={this.renderCategories(this.filteredQA(HelpQA, search))}
          />
        </div>
      </div>
    )
  }
}

export default HelpPage;