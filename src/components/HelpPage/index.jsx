import * as React from 'react';
import PropTypes from "prop-types"
import './Help.css';
import { HelpQA } from './help-qa.data';


class ExpansionPanel extends React.Component {
  static propTypes = {
    multi: PropTypes.bool, //TODO: Keeps multiple items open
    list: PropTypes.arrayOf(list => {
      console.log({ list })
      if (!list.every(item => item.props.children.length === 2)) {
        return new Error("ExpansionPanel expects its list prop item to contain 2 children (First is used as a clickable panel label.)")
      }
    }).isRequired
  }

  state = { key: [] }

  handleClick = key => {
    this.setState({ key: key === this.state.key ? [] : [key] })
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
                {this.state.key.includes(listItem.key) && content}
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

class HelpPage extends React.Component {
  state = { activeQuestion: null }

  handleClick = question =>
    this.setState({
      activeQuestion: question === this.state.activeQuestion
        ? null
        : question
    })

  render() {
    return (
      <React.Fragment>
        <div className="help-banner" />
        <div className="help-container">
          {/* <div className="help-background-color" /> */}
          <div className="help-search-title">Looking for Help?</div>
          <input
            className="help-search-bar"
            type="search"
            placeholder="How can we help?"
          />
          <div className="help-QA__container">
            {
              HelpQA.map(item => {
                return (
                  <React.Fragment>
                    <div className="QA-title__outer">
                      <div className="QA-title__inner">
                        {item.category}
                        <i className="fas fas fa-chevron-down" />
                      </div>
                    </div>
                    {
                      !this.state.activeQuestion &&
                      item.qa_set.map(({ question, answer }) => {
                        return (
                          <React.Fragment>
                            <div className="QA-question">{question}</div>
                            <div className="QA-answer">{answer}</div>
                          </React.Fragment>
                        )
                      })
                    }
                  </React.Fragment>
                )
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default HelpPage;