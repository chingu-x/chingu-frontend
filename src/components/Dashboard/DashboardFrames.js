import React from 'react';
import PersonalFrame from './dashboardFrames/PersonalFrame';
import ProfileFrame from './dashboardFrames/ProfileFrame';

const DashboardFrames = ({user, currentFrame, toggleModal}) => {
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
  } = user;

  //Renders Which Frame is Shown
  function renderFrame(){
    
    if(currentFrame === "personal") {
      return(
        <PersonalFrame 
          first_name={first_name} 
          last_name={last_name} 
          toggleModal={toggleModal}
        />
      );
    } else if (currentFrame === "profile") {
      return (
        <ProfileFrame 
          bio={bio} 
          github_url={github_url}
          linkedin_url={linkedin_url}
          portfolio_url={portfolio_url}
          website_url={website_url}
          twitter_url={twitter_url}
          blog_url={blog_url}
          profile_image={profile_image}
          toggleModal={toggleModal}
        />
      );
    }
  }
  return (
    <React.Fragment>{renderFrame()}</React.Fragment>
  );
}

export default DashboardFrames;