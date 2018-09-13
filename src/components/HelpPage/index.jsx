import * as React from 'react';
import PropTypes from "prop-types"
import { HelpQA } from './help-qa.data';
import './Help.css';

class ExpansionPanel extends React.Component {
  state = { keys: [] }

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
    return { keys: !defaultOpen ? [] : list.map(item => item.key) }
  }

  handleClick = key => {
    const { keys } = this.state
    const { multi, defaultOpen } = this.props

    if (multi || defaultOpen) {
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
            const isOpen = this.state.keys.includes(listItem.key)
            return (
              <React.Fragment key={listItem.key}>
                <div
                  onClick={() => this.handleClick(listItem.key)}>
                  {typeof label === "function" ? label({ isOpen }) : label}
                </div>
                {isOpen && content}
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
  state = { search: "" }
  static getDerivedStateFromProps({ location, match }) {
    const queryParams = new URLSearchParams(location.search);
    return { search: queryParams.get('search') || match.params.searchTerm }
  }

  renderQuestions = list =>
    list.map(({ question, answer }) =>
      <React.Fragment key={question}>
        <div className="QA-question">{question}</div>
        <div className="QA-answer">
          {answer}
        </div>
      </React.Fragment>
    )

  renderCategories = list =>
    list.map((item, idx) =>
      <React.Fragment key={item.category}>
        {
          ({ isOpen }) =>
            <div className="QA-title__outer">
              <div className="QA-title__inner">
                {item.category}
                <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`} />
              </div>
            </div>
        }
        <ExpansionPanel
          className="expansion-section"
          list={this.renderQuestions(item.qa_set)} />
      </React.Fragment>
    )

  filteredQA = (list, search) => {
    // If search input, return whole list
    if (!search) return list

    // If search input found:
    // Cleanup search input
    search = search.toLowerCase().split(" ")
      .reduce((search, term) =>
        !!term.trim() ?
          [...search, term.trim()]
          : search, [])

    // stringifies the QA item
    // looks through nested objects to extract strings within react fragments
    const StringifyQAItem = (QAItem) => {
      let stringifiedResult = QAItem;
      if (typeof QAItem === 'object') {
        let strings = [];
        let checkTheseObjects = [QAItem];
        while (checkTheseObjects.length > 0) {
          let reactObject = checkTheseObjects.pop();
          let children = reactObject.props.children;
          if (!children) { continue; }
          if (typeof children === 'string') { strings.push(children) }
          else if (typeof children === 'object') {
            // if children is an array, push children objects into checkTheseObjects
            children.forEach((item) => {
              typeof item === 'string' ? strings.push(item) : checkTheseObjects.push(item);
            })
          }
        }
        stringifiedResult = strings.join(' ');
      }
      return stringifiedResult.toLowerCase();
    }

    return list.reduce((reduced, { category, qa_set }) => {
      const qa = qa_set.filter(qa => {
        let questionString = StringifyQAItem(qa.question);
        let answerString = StringifyQAItem(qa.answer);
        return search.every((term) => questionString.includes(term) || answerString.includes(term))
      })
      return !!qa.length ? [...reduced, { category, qa_set: qa }] : reduced
    }, [])
  }

  render() {
    const { search } = this.state
    return (
      <div className="help-page--container" >
        <div className="help-banner" />
        <div className="help-container">

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