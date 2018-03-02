import React from "react";

//Links Modal for Dashboard
const LinksModal = ({ user, onChange, errorMessages }) => {
  let {
    github_url,
    linkedin_url,
    portfolio_url,
    website_url,
    twitter_url,
    blog_url
  } = user;

  function renderLinkToUsername(link, type) {
    if(link === null) {
      return "";
    } else {
      if (type === "gh") {
        return link.split("/")[3];
      } else if (type === "li") {
        return link.split("/")[4];
      } else if (type === "tw") {
        return link.split("/")[3];
      }
    }
  }

  return (
    <React.Fragment>
      <div className="edit-modal-item">
        <div className="edit-modal-left">Github Username: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={renderLinkToUsername(github_url, "gh") || "Github URL"}
            name="github_url"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.github_url}</div>
        </div>
      </div>
      <div className="edit-modal-item">
        <div className="edit-modal-left">LinkedIn Username: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={
              renderLinkToUsername(linkedin_url, "li") || "LinkedIn Username"
            }
            name="linkedin_url"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.linkedin_url}</div>
        </div>
      </div>
      <div className="edit-modal-item">
        <div className="edit-modal-left">Portfolio: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={portfolio_url || "Portfolio URL"}
            name="portfolio_url"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.portfolio_url}</div>
        </div>
      </div>
      <div className="edit-modal-item">
        <div className="edit-modal-left">Website: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={website_url || "Website URL"}
            name="website_url"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.website_url}</div>
        </div>
      </div>
      <div className="edit-modal-item">
        <div className="edit-modal-left">Twitter Username: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={
              renderLinkToUsername(twitter_url, "tw") || "Twitter Username"
            }
            name="twitter_url"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.twitter_url}</div>
        </div>
      </div>
      <div className="edit-modal-item">
        <div className="edit-modal-left">Blog URL: </div>
        <div className="edit-modal-right">
          <input
            type="text"
            placeholder={blog_url || "Blog URL"}
            name="blog_url"
            onChange={onChange}
          />
          <div className="errorMessages">{errorMessages.blog_url}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LinksModal;
