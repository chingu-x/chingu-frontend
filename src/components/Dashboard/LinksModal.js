import React from "react";

// TODO: add verification of data.

const LinksModal = ({user, onChange}) => {
  let {github_url, linkedin_url, portfolio_url, website_url, twitter_url, blog_url} = user;

  return (
    <React.Fragment>
      <input type="text" placeholder={github_url || "Github URL"}  name="github_url" onChange={onChange}/>
      <input type="text" placeholder={linkedin_url || "LinkedIn URL"}  name="linkedin_url" onChange={onChange}/>
      <input type="text" placeholder={portfolio_url || "Portfolio URL"}  name="portfolio_url" onChange={onChange}/>
      <input type="text" placeholder={website_url || "Website URL"}  name="website_url" onChange={onChange}/>
      <input type="text" placeholder={twitter_url || "Twitter URL"}  name="twitter_url" onChange={onChange}/>
      <input type="text" placeholder={blog_url || "Blog URL" }  name="blog_url" onChange={onChange}/>
    </React.Fragment>
  );
};

export default LinksModal;
