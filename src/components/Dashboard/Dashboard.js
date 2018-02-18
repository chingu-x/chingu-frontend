import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import dashboardQuery from "../../queries/dashboardQuery";
import updateUser from "../../mutations/updateUser";
import LinksModal from "./LinksModal";
import BioModal from "./BioModal";
import PersonalModal from "./PersonalModal";
import Button from "../common/Button";
import image from "../../styles/assets/bear8.jpg";

// TODO: add verification of data.

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "personal",
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

  handleOnSubmit(e) {
    e.preventDefault();

    this.updateUser();
    this.toggleModal();
  }

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
      const re = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
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

  renderModalBody() {
    switch (this.state.currentModal) {
      case "links":
        return (
          <LinksModal
            user={this.props.data.user}
            onChange={e => this.handleOnChange(e)}
            errorMessages={this.state.errorMessages}
          />
        );
      case "bio":
        return (
          <BioModal
            user={this.props.data.user}
            onChange={e => this.handleOnChange(e)}
            errorMessages={this.state.errorMessages}
          />
        );
      case "personal":
        return (
          <PersonalModal
            user={this.props.data.user}
            onChange={e => this.handleOnChange(e)}
            errorMessages={this.state.errorMessages}
          />
        );
      default:
        return null;
    }
  }

  togglePage(currentPage) {
    this.setState({
      currentPage: currentPage
    });
  }

  toggleModal(currentModal) {
    if (this.state.currentModal === "") {
      this.setState({
        currentModal: currentModal
      });
    } else {
      this.setState({
        currentModal: ""
      });
    }
  }

  renderPage(){
    let {
      first_name,
      last_name,
      bio,
      github_url,
      linkedin_url,
      portfolio_url,
      website_url,
      twitter_url,
      blog_url,
      profile_image
    } = this.props.data.user;
    if(this.state.currentPage === "personal") {
      return(
        <React.Fragment>
          <div className="dashboard-body-header">
            <h3>Personal Details</h3>
            <Button
              type="button"
              classname="dash-btn"
              onClick={() => this.toggleModal("personal")}
              text="Edit"
            />
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">First Name: </span>
            <span className="dashboard-body-right">{first_name} </span>
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">Last Name: </span>
            <span className="dashboard-body-right">{last_name} </span>
          </div>
        </React.Fragment>
      );
    } else if (this.state.currentPage === "profile") {
      return (
        <React.Fragment>
          <div className="dashboard-body-header">
              <h3>Bio</h3>
              <Button 
                type="button" 
                classname="dash-btn"
                onClick={() => this.toggleModal("bio")}
                text="Edit"
              />
            </div>
            <div className="dashboard-body-item">
              <span className="dashboard-body-left">About Me: </span>
              <span className="dashboard-body-right">{bio} </span>
            </div>

          <div className="dashboard-body-header">
            <h3>Links</h3>
            <Button 
              type="button" 
              classname="dash-btn"
              onClick={() => this.toggleModal("links")}
              text="Edit"
            />
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">LinkedIn: </span>
            <span className="dashboard-body-right">{linkedin_url} </span>
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">Github: </span>
            <span className="dashboard-body-right">{github_url} </span>
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">Portfolio: </span>
            <span className="dashboard-body-right">{portfolio_url} </span>
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">Website: </span>
            <span className="dashboard-body-right">{website_url} </span>
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">Twitter: </span>
            <span className="dashboard-body-right">{twitter_url} </span>
          </div>
          <div className="dashboard-body-item">
            <span className="dashboard-body-left">Blog: </span>
            <span className="dashboard-body-right">{blog_url} </span>
          </div>
        </React.Fragment>
      );
    }
  }

  renderModal() {
    if (this.state.currentModal !== "") {
      return (
        <div className="modal-wrapper">
          <div className="overlay" onClick={() => this.toggleModal("")} />
          <div className="edit-modal">
            <form onSubmit={e => this.handleOnSubmit(e)}>
              <div className="edit-modal-header">
                <h3>Edit Your Settings</h3>
              </div>
              <div className="edit-modal-body">{this.renderModalBody()}</div>
              <div className="edit-modal-bottom">
                <Button 
                  type="button" 
                  classname="modal-btn red"
                  onClick={() => this.toggleModal("")}
                  text="Cancel" 
                />
                <Button 
                  type="submit"
                  classname="modal-btn"
                  text="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let { loading, error, user } = this.props.data;
    if (loading) {
      return "";
    } else if (error) {
      return <h1>An error ocurred</h1>;
    } else if (!user) {
      return <h1>User not found</h1>;
    }

    let {
      first_name,
      last_name,
      bio,
      github_url,
      linkedin_url,
      portfolio_url,
      website_url,
      twitter_url,
      blog_url,
      profile_image
    } = this.props.data.user;
    console.log(this.props.data.user);

    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>SETTINGS</h2>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-sidebar">
            <img src={profile_image || image} className="dashboard-img" />
            <div className="dashboard-name">
              {first_name} {last_name}
            </div>
            <div className={this.state.currentPage === "personal" ? "dashboard-option current" : "dashboard-option"} onClick={() => this.togglePage("personal")}>Personal Details</div>
            <div className={this.state.currentPage === "profile" ? "dashboard-option current" : "dashboard-option"} onClick={() => this.togglePage("profile")}>Public Profile</div>
          </div>
          <div className="dashboard-body">
            {this.renderPage()}
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
