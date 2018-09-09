import * as React from 'react';
import PropTypes from "prop-types"
import './Help.css';
import { HelpQA } from './help-qa.data';


// TODO: 
// class ExpansionPanel extends React.Component {
//   static propTypes = {
//     children: PropTypes.arrayOf(PropTypes.element).isRequired,
//     multi: PropTypes.bool //TODO: Keeps multiple items opne
//   }

//   state = { key: null }

//   handleClick = key => {
//     this.setState({ key: key === this.state.key ? null : key })
//   }

//   render() {
//     return ()
//   }

// }

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