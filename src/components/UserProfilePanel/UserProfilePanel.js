import * as React from "react";

/**
 * TODO:
 * 1. remove hardcoded data
 * 2. factor out html components
 * 3. convert class to function
 **/

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile-container-personal">
        <header className="user">
          <div className="photobox">
            <img
              className="user-photo"
              src="http://via.placeholder.com/250x250"
              alt="userprofile"
            />
            <p>lilgangwolf</p>
            <p>Based in Los Angeles, CA</p>
          </div>
          <ul className="positions">
            <li className="position">
              <span>
                <i className="fas fa-check" />
              </span>Designer
            </li>
            <li className="position">
              <span>
                <i className="fas fa-check" />
              </span>Programmer
            </li>
          </ul>
        </header>
        <div className="user-background">
          <h1>background</h1>
          <p>{this.props.background}</p>
        </div>
        <div className="user-coding-history">
          <h1>coding history</h1>
          <p>{this.props.codingHistory}</p>
        </div>
        <div className="user-interests">
          <h1>interests</h1>
          <p>{this.props.interests}</p>
        </div>
        <div className="user-links">
          <h1>links</h1>
          <ul>
            <li>
              <a href="">
                <i className="fab fa-facebook fa-3x" />
              </a>
            </li>
            <li>
              <a href="">
                <i className="fab fa-google fa-3x" />
              </a>
            </li>
          </ul>
        </div>
        <div className="user-skills">
          <h1>skills</h1>
          <ul>
            <li>React</li>
            <li>JavaScript</li>
            <li>Adobe XD</li>
            <li>HTML/CSS</li>
          </ul>
        </div>
      </div>
    );
  }
}

UserProfile.defaultProps = {
  background:
    "Experienced with React and Vue. Looking forward to creating beautiful projects with teams!",
  codingHistory:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec. Amet purus gravida quis blandit turpis cursus in hac habitasse. Sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar.",
  interests:
    "At in tellus integer feugiat scelerisque varius morbi. Tempus urna et pharetra pharetra massa massa. Etiam tempor orci eu lobortis elementum nibh tellus. Quisque egestas diam in arcu cursus euismod quis viverra. Et pharetra pharetra massa massa ultricies mi quis hendrerit. A cras semper auctor neque. Venenatis cras sed felis eget velit aliquet sagittis."
};

export default UserProfile;
