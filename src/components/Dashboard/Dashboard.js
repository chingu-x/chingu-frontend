import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import dashboardQuery from "../../queries/dashboardQuery";
import updateUser from "../../mutations/updateUser";

class Dashboard extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    github_url: "",
    bio: "",
    linkedin_url: "",
    portfolio_url: "",
    website_url: "",
    twitter_url: "",
    blog_url: "",
  };

  async handleOnChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  updateUserInfo(){
    let {first_name, last_name, username, github_url, bio, linkedin_url, portfolio_url, website_url, twitter_url, blog_url} = this.state;

    !!first_name ? first_name = this.state.first_name : first_name = this.props.data.user.first_name;
    !!last_name ? last_name = this.state.last_name : last_name = this.props.data.user.last_name;
    !!username ? username = this.state.username : username = this.props.data.user.username;
    !!github_url ? github_url = this.state.github_url : github_url = this.props.data.user.github_url;
    !!bio ? bio = this.state.bio : bio = this.props.data.user.bio;
    !!linkedin_url ? linkedin_url = this.state.linkedin_url : linkedin_url = this.props.data.user.linkedin_url;
    !!portfolio_url ? portfolio_url = this.state.portfolio_url : portfolio_url = this.props.data.user.portfolio_url;
    !!website_url ? website_url = this.state.website_url : website_url = this.props.data.user.website_url;
    !!twitter_url ? twitter_url = this.state.twitter_url : twitter_url = this.props.data.user.twitter_url;
    !!blog_url ? blog_url = this.state.blog_url : blog_url = this.props.data.user.blog_url;
      
    github_url = github_url.toLowerCase();
    console.log(github_url);

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
        console.log(data);
        // window.localStorage.setItem("token", data.updateUser.jwt);
        // window.location = "/user/" + data.createUser.user.username;
        // window.location = "/slack";
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleOnSubmit(e) {
    e.preventDefault();

    this.updateUserInfo();
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

    const { 
      first_name, 
      last_name, 
      email,
      username,
      bio, 
      linkedin_url,
      github_url,
      twitter_url,
      blog_url,
      portfolio_url
    } = this.props.data.user;

    return (
      <div className="dashboard">
        <div className="dashboard-wrapper">
          <form onSubmit={e => this.handleOnSubmit(e)}>
          <div>Name: {first_name} {last_name}</div>
          <div>Username: {username}</div>
          <div>Bio: {bio}</div>
          <div>LinkedIn: <input type="text" name="linkedin_url" placeholder={linkedin_url} value={this.state.linkedin_url} onChange={e => this.handleOnChange(e)}/></div>
          <div>Github: <input type="text" name="github_url" placeholder={github_url} value={this.state.github_url} onChange={e => this.handleOnChange(e)}/></div>
          <div>Twitter: {twitter_url}</div>
          <div>Blog: {blog_url}</div>
          <div>Portfolio: {portfolio_url}</div>
          <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(updateUser), 
  graphql(dashboardQuery)
)(Dashboard);
