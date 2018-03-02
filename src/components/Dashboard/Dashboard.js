import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import { Link } from "react-router-dom";
import dashboardQuery from "../../queries/dashboardQuery";
import updateUser from "../../mutations/updateUser";
import Modals from "./Modals";
import DashboardFrames from "./DashboardFrames";
import userImage from "../../styles/assets/user-placeholder.png";

// TODO: add verification of data.

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFrame: "personal",
      currentModal: "",
      first_name: "",
      last_name: "",
      bio: "",
      username: "",
      github_url: "",
      linkedin_url: "",
      portfolio_url: "",
      website_url: "",
      twitter_url: "",
      blog_url: "",
      profile_image: "",
      skills: "",
      city: "",
      country: "",
      errorMessages: {
        first_name: "",
        last_name: "",
        bio: "",
        username: "",
        github_url: "",
        linkedin_url: "",
        portfolio_url: "",
        website_url: "",
        twitter_url: "",
        blog_url: ""
      }
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  //On Form Submit, Update User
  handleOnSubmit(e) {
    e.preventDefault();

    this.updateUser();
    this.toggleModal();
  }

  //On Input Change, Set State
  handleOnChange(e) {
    let value = "";
    let errorMessages = this.state.errorMessages;
    if (e.target.name === "github_url") {
      value = "https://www.github.com/" + e.target.value;
    } else if (e.target.name === "linkedin_url") {
      value = "https://www.linkedin.com/in/" + e.target.value;
    } else if (e.target.name === "twitter_url") {
      value = "https://twitter.com/" + e.target.value;
    } else if (
      e.target.name === "portfolio_url" ||
      e.target.name === "website_url" ||
      e.target.name === "blog_url"
    ) {
      if (this.validate(e.target.value, "link")) {
        value = e.target.value;
        errorMessages[e.target.name] = "";
      } else {
        value = "";
        errorMessages[e.target.name] =
          "Link must begin with https:// or http://.";
      }
    } else if (
      e.target.name === "first_name" ||
      e.target.name === "last_name"
    ) {
      if (this.validate(e.target.value, "name")) {
        value = e.target.value;
        errorMessages[e.target.name] = "";
      } else {
        value = "";
        errorMessages[e.target.name] =
          "Name must contain only letters, numbers, - and _.";
      }
    } else if (e.target.name === "bio") {
      if (this.validate(e.target.value, "bio")) {
        value = e.target.value;
        errorMessages[e.target.name] = "";
      } else {
        value = "";
        errorMessages[e.target.name] = "Bio must be under 5000 characters.";
      }
    } else {
      value = e.target.value;
    }
    this.setState({
      [e.target.name]: value,
      errorMessages: errorMessages
    });
  }

  // Validate function
  validate(item, type) {
    if (type === "link") {
      //Links must start with http or https
      const re = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-@~]*)*\/?$/;
      return item.match(re);
    } else if (type === "name") {
      //Names can only contain letters, numbers, - and _
      const re = /^[a-zA-Z0-9-_\s]*$/;
      return item.match(re);
    } else if (type === "bio") {
      //Bio cannot be longer than 5000 characters.
      return item.length <= 5000;
    }
  }

  //Update User in the Database
  updateUser() {
    let updatedUser = {};

    Object.keys(this.props.data.user).map(i => {
      if (this.state[i] === "" || this.state[i] === undefined) {
        return (updatedUser[i] = this.props.data.user[i]);
      } else {
        return (updatedUser[i] = this.state[i]);
      }
    });

    let {
      first_name,
      last_name,
      bio,
      username,
      github_url,
      linkedin_url,
      portfolio_url,
      website_url,
      twitter_url,
      blog_url
    } = updatedUser;

    this.props
      .mutate({
        variables: {
          first_name,
          last_name,
          username,
          github_url,
          bio,
          linkedin_url,
          portfolio_url,
          website_url,
          twitter_url,
          blog_url
        }
      })
      .then(({ data }) => {
        // console.log(data);
        // Leaving here for reference.
      })
      .catch(err => {
        console.error(err);
      });
  }

  //Toggle Frame on the Right Side of the Display
  toggleFrame(currentFrame) {
    this.setState({
      currentFrame: currentFrame
    });
  }

  //Toggle Which Modal is Open
  toggleModal = currentModal => {
    if (this.state.currentModal === "") {
      this.setState({
        currentModal: currentModal
      });
    } else {
      this.setState({
        currentModal: ""
      });
    }
  };

  //Render the Modal
  renderModal() {
    if (this.state.currentModal !== "") {
      return (
        <Modals
          currentModal={this.state.currentModal}
          user={this.props.data.user}
          errorMessages={this.state.errorMessages}
          onChange={e => this.handleOnChange(e)}
          toggleModal={this.toggleModal}
          onSubmit={e => this.handleOnSubmit(e)}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    let { loading, error, user } = this.props.data;
    if (loading) {
      return (
        <div className="dashboard"></div>
      );
    } else if (error) {
      return <h1>An error ocurred</h1>;
    } else if (!user) {
      return <h1>User not found</h1>;
    }

    let {
      first_name,
      last_name,
      profile_image,
      username
    } = this.props.data.user;

    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>SETTINGS</h2>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-sidebar">
            <img
              src={profile_image || userImage}
              className="dashboard-img"
              alt="User"
            />
            <div className="dashboard-name">
              {first_name} {last_name}
            </div>
            <div
              className={
                this.state.currentFrame === "personal"
                  ? "dashboard-option current"
                  : "dashboard-option"
              }
              onClick={() => this.toggleFrame("personal")}
            >
              Personal Details
            </div>
            <div
              className={
                this.state.currentFrame === "profile"
                  ? "dashboard-option current"
                  : "dashboard-option"
              }
              onClick={() => this.toggleFrame("profile")}
            >
              Public Profile
            </div>
            <Link to={`/user/${username}`} className="dashboard-option">
              View Profile
            </Link>
          </div>
          <div className="dashboard-body">
            <DashboardFrames
              user={this.props.data.user}
              currentFrame={this.state.currentFrame}
              toggleModal={this.toggleModal}
            />
            {this.renderModal()}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(updateUser, {
    options: {
      refetchQueries: ["dashboardQuery"]
    }
  }),
  graphql(dashboardQuery)
)(Dashboard);
