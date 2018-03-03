import React, { Component } from 'react';

class FAQ extends Component {

  state = {
    activeQuestion: null
  }

  handleOnClick = (ques) => {
    if(this.state.activeQuestion === ques) {
      this.setState({
        activeQuestion: null
      });
    } else {
      this.setState({
        activeQuestion: ques
      });
    }
  }

  renderAnswer(ans){
    return {
      __html: ans
    }
  }

  renderQuestion(ques, ans){
    return (
      <div key={ques} className="faq-item" onClick={() => this.handleOnClick(ques)}>
        <div className="faq-question" >{ques}</div>
        <div className={this.state.activeQuestion === ques ? "faq-answer active" : "faq-answer"} dangerouslySetInnerHTML={this.renderAnswer(ans)}></div>
      </div>
    );
  }

  render(){
    let data = this.props.data;
    let text = this.props.headerText;
    return (
      <div className="faq">
        <h1>{text}</h1>
        {data.map(({ques, ans}) => this.renderQuestion(ques, ans))}
      </div>
    );
  }
}

export default FAQ;