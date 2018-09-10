import * as React from 'react';
import PropTypes from "prop-types"
import { HelpQA } from './help-qa.data';
import './Help.css';


class ExpansionPanel extends React.Component {
  static propTypes = {
    multi: PropTypes.bool, //TODO: Keeps multiple items open
    list: PropTypes.arrayOf(list => {
      console.log({ list })
      if (!list.every(item => item.props.children.length === 2)) {
        return new Error(`ExpansionPanel expects its list prop item to 
        contain 2 children (First is used as a clickable panel label.)`)
      }
    }).isRequired
  }

  state = { keys: [] }

  handleClick = key => {
    const { keys } = this.state
    this.setState({ keys: keys.includes(key) ? [] : [key] })
  }

  render() {
    return (
      <div className={this.props.className}>
        {
          this.props.list.map(listItem => {
            console.log({ key: listItem.key, state: this.state.key })
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

const HelpPage = props => {
  const renderQuestions = list => (
    list.map(({ question, answer }) => {
      return (
        <React.Fragment key={question}>
          <div className="QA-question">{question}</div>
          <div className="QA-answer">{answer}</div>
        </React.Fragment>
      )
    })
  )

  const renderCategories = list => (
    list.map((item, idx) => {
      return (
        <React.Fragment key={idx}>
          <div className="QA-title__outer">
            <div className="QA-title__inner">
              {item.category}
              <i className="fas fas fa-chevron-down" />
            </div>
          </div>
          <ExpansionPanel className="expansion-section" list={renderQuestions(item.qa_set)} />
        </React.Fragment>
      )
    }))

  return (
    <div className="help-page--container">
      <div className="help-banner" />
      <div className="help-container">
        {/* <div className="help-background-color" /> */}
        <div className="help-search-title">How can we help you?</div>
        <input
          className="help-search-bar"
          type="search"
          placeholder="Search Help"
        />
        <ExpansionPanel
          className="help-QA__container"
          list={renderCategories(HelpQA)}
        />
      </div>
    </div>
  )
}

export default HelpPage;