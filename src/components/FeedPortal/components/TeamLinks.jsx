import * as React from 'react';

const TeamLinks = ({ project: { github_url, project_url, communication_url, workflow_url } }) => {
    let key = ['github_url', 'project_url', 'communication_url', 'workflow_url'];
    [github_url, project_url, communication_url, workflow_url].map((link, idx) => {
        console.log(key[idx]);
        return link &&
            <img
                key={idx}
                alt="icon"
                className="team-resource-links"
                src={require(`../../../assets/${key[idx]}.png`)}
            >
                <a target="_blank" href={link} />
            </img>
    })
    return null;
}

export default TeamLinks;