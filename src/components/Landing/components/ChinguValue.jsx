import React from "react";
import "./ChinguValue.scss";
import { chingu_value, level_ups } from "../copywriting";

const ChinguValue = () => {
  return (
    <section className="chingu-value--container">
      <section className="chingu-value">
        <div className="chingu-value--left">
          <h4 className="landing--minor">{chingu_value.minor}</h4>
          <h1 className="landing--subheader">{chingu_value.header}</h1>
          <h3 className="landing--description">{chingu_value.description}</h3>
          <h3 className="landing--description">
            {chingu_value.bullets.map((text, idx) => {
              return (
                <div className="landing--bulet-unit" key={idx}>
                  <i class="fas fa-circle" />
                  <h3 key={idx} className="landing--bullets">
                    {text}
                  </h3>
                </div>
              );
            })}
          </h3>
        </div>
        <div className="chingu-value--right">
          <LevelUps />
        </div>
      </section>
    </section>
  );
};

const LevelUps = () => {
  return (
    <section className="level-ups--container">
      <div className="skills-base landing--h5">
        <div className="skill-line" />
        <div className="skills-base-header">{level_ups.base_skill}</div>
      </div>
      {level_ups.skills.map((category, idx) => {
        return <LevelUpCategory category={category} key={idx} />;
      })}
    </section>
  );
};

const LevelUpCategory = ({ category }) => {
  return (
    <div className={`skills-category--container ${category.className}`}>
      <div className="skills-header">
        <i class="fas fa-plus" />
        <div className="landing--h5">{category.header}</div>
      </div>
      <div className="skills-list">
        {category.skills.map((skill, idx) => {
          return (
            <div key={idx} className="skill-unit">
              <div className="skill-line" />
              <div className="skill-name landing--subtext">{skill}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChinguValue;
