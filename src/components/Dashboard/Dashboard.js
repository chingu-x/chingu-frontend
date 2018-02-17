import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import dashboardQuery from "../../queries/dashboardQuery";
import updateUser from "../../mutations/updateUser";
import LinksModal from "./LinksModal";
import BioModal from "./BioModal";
import PersonalModal from "./PersonalModal";

// TODO: add verification of data.

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          "Name must contain only letters, numbers, hyphens and underscores.";
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
                <button type="button" onClick={() => this.toggleModal("")}>
                  Close
                </button>
                <button tyoe="submit">Submit</button>
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
      blog_url
    } = this.props.data.user;
    
    return (
      <div>
        <div>
          <h3>Personal</h3>
          <button type="button" onClick={() => this.toggleModal("personal")}>
            Edit
          </button>
        </div>
        <div>First Name: {first_name} </div>
        <div>Last Name: {last_name} </div>

        <div>
          <h3>Bio</h3>
          <button type="button" onClick={() => this.toggleModal("bio")}>
            Edit
          </button>
        </div>
        <div>Bio: {bio} </div>

        <div>
          <h3>Links</h3>
          <button type="button" onClick={() => this.toggleModal("links")}>
            Edit
          </button>
        </div>
        <div>LinkedIn: {linkedin_url} </div>
        <div>Github: {github_url} </div>
        <div>Portfolio: {portfolio_url} </div>
        <div>Website: {website_url} </div>
        <div>Twitter: {twitter_url} </div>
        <div>Blog: {blog_url} </div>

        {this.renderModal()}
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
