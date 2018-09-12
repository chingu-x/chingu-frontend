import React from "react";

class TierSelectRadioComponent extends React.Component {
  render() {
    const badges = [
      {
        img: require('../../../../../assets/tier badges-01.png'),
        className: 'badge',
        btnClassName: 'badge--1'
      },
      {
        img: require('../../../../../assets/tier badges-02.png'),
        className: 'badge',
        btnClassName: 'badge--2'
      },
      {
        img: require('../../../../../assets/tier badges-03.png'),
        className: 'badge',
        btnClassName: 'badge--3'
      }
    ]
    const { answer, field_name, index, onFormChange, form_data } = this.props;
    return (
      <div className={badges[index].btnClassName + '-container'}>
        <div key={'radio-answer_' + field_name + '_' + index} className="radio-container">
          <label className="form-answer" htmlFor={field_name + '_' + index}>
            <div className={badges[index].btnClassName}>
              <img className={badges[index].className} src={badges[index].img} alt={'badge-' + index} />
            </div>
            <div className="badge-title">{`Tier ${answer}`}</div>
            {/* im sorry... */}
            <div className="badge-subtext">
              {
                answer === "1" && <p>HTML / Basic Javascript / Basic Algorithms (Landing Pages)</p> ||
                answer === "2" && <p>Intermediate Algorithms / Front-end Projects (Front-End)</p> ||
                answer === "3" && <p>Advanced Projects / Data Visualization / Back-end (Full-Stack)</p>
              }
            </div>
            <input
              className="form-radio special-badge-input"
              type="radio"
              name={field_name}
              id={field_name + '_' + index}
              value={answer}
              checked={form_data[field_name] === answer}
              onChange={e => onFormChange(e)}
            />
            <span className="radio-checkmark--badge" />
          </label>
        </div>
      </div>
    )
  }
}

const voyage_application_tier_select = (data, onFormChange, form_data) => {
  return (
    <div>
      <div className="form-subtext">
        *IMPORTANT* Please read carefully - this has a big influence on your team placement.
        <br /> 
        In Chingu we split teams into 3 broad tiers:
        <br />
        - Tier-3 (Bears) teams typically build full-stack applications. 
        <br />
        - Tier-2 (Geckos) teams typically build front-end projects. 
        <br />
        - Tier-1 (Toucans) teams typically build landing pages.
        <br /> 
        Note: If you are at the Tier-1 level, don't choose Tier-3. It will be obvious to your team-mates, 
        they'll be annoyed with you and it'll create more work for us (as we'll have to remove you from that team).
      </div>
      <div className="badge-container">
        {data.options.map(
          (answer, index) => (
            <TierSelectRadioComponent
              key={data.field_name + '_' + index}
              answer={answer}
              field_name={data.field_name}
              index={index}
              onFormChange={onFormChange}
              form_data={form_data}
            />
          )
        )}
      </div>
    </div>
  )
}

export default voyage_application_tier_select;
