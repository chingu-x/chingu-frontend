import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import dashboardQuery from "../../queries/dashboardQuery";
import updateUser from "../../mutations/updateUser";
import LinksModal from "./LinksModal";
import BioModal from "./BioModal";
import PersonalModal from "./PersonalModal";

// TODO: add verification of data.

class Dashboard extends Component {
  constructor(props){
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
      country: ""
    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();

    this.updateUser();
    this.toggleModal();
  }

  handleOnChange(e) { 
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateUser(){
    let updatedUser = {};

    Object.keys(this.props.data.user).map(i => {
      if(this.state[i] === "" || this.state[i] === undefined){
        return updatedUser[i] = this.props.data.user[i];
      } else {
        return updatedUser[i] = this.state[i];
      }
    });
    let {first_name, last_name, bio, username, github_url, linkedin_url, portfolio_url, website_url, twitter_url, blog_url} = updatedUser;

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
          blog_url,
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

  renderModalBody(){
    switch(this.state.currentModal){
      case 'links':
        return <LinksModal user={this.props.data.user} onChange={(e) => this.handleOnChange(e)}/>
      case 'bio':
        return <BioModal user={this.props.data.user} onChange={e => this.handleOnChange(e)} />;
      case 'personal':
        return <PersonalModal user={this.props.data.user} onChange={e => this.handleOnChange(e)} />;
      default:
        return null;
    }
  }

  toggleModal(currentModal){
    if(this.state.currentModal === ""){
      this.setState({
        currentModal: currentModal
      })
    } else {
      this.setState({
        currentModal: ""
      })
    }
  }

  renderModal(){
    if(this.state.currentModal !== ""){
      return(
        <div className="modal-wrapper">
          <div className="overlay" onClick={() => this.toggleModal("")} />
          <div className="edit-modal">
            <form onSubmit={(e) => this.handleOnSubmit(e)}>
            <div className="edit-modal-header">
              <h3>Edit Your Settings</h3>
            </div>
            <div className="edit-modal-body">
              {this.renderModalBody()}
            </div>
            <div className="edit-modal-bottom">
              <button type="button" onClick={() => this.toggleModal("")}>Close</button>
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
      return (
        ""
      );
    } else if (error) {
      return (
          <h1>An error ocurred</h1>
      );
    } else if (!user) {
      return (
          <h1>User not found</h1>
      );
    };
    
    let {first_name, last_name, bio,  github_url, linkedin_url, portfolio_url, website_url, twitter_url, blog_url} = this.props.data.user;
    return (

      <div>
        <div><h3>Personal</h3><button type="button" onClick={() => this.toggleModal("personal")}>Edit</button></div>
        <div>First Name: {first_name} </div>
        <div>Last Name: {last_name} </div>

        <div><h3>Bio</h3><button type="button" onClick={() => this.toggleModal("bio")}>Edit</button></div>
        <div>Bio: {bio} </div>

        <div><h3>Links</h3><button type="button" onClick={() => this.toggleModal("links")}>Edit</button></div>
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
      refetchQueries: [
      'dashboardQuery'
    ],
  }, 
}), 
  graphql(dashboardQuery)
)(Dashboard);