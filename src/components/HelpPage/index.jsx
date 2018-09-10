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
    all: PropTypes.bool, // Shows whole list (use with already filtered lists)
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
    all: false
  }

  state = { keys: [] }

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
                {(this.props.all || this.state.keys.includes(listItem.key)) && content}
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
  state = { search: null }

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
    const stringIncludes = (str, term) => str.toString().toLowerCase().includes(term)
    const filterQA = (list, term) => list.filter(qa =>
      stringIncludes(qa.question, term) || stringIncludes(qa.answer, term))

    const filtered = (list, term) => list.reduce((reduced, { category, qa_set }) => {
      const qa = filterQA(qa_set, term)
      if (/*stringIncludes(category, term) || */ !!qa.length) {
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
            onChange={e => this.setState({ search: e.target.value })}
          />
          <ExpansionPanel
            all={!!search}
            className="help-QA__container"
            list={this.renderCategories(this.filteredQA(HelpQA, search))}
          />
        </div>
      </div>
    )
  }
}

export default HelpPage;