import * as React from 'react';

const TeamLinks = ({ project: { github_url, project_url, communication_url, workflow_url } }) => {
    let key = ['github_url', 'project_url', 'communication_url', 'workflow_url'];
    let links = [github_url, project_url, communication_url, workflow_url].map((link, idx) => {
        return link &&
            <a key={idx} target="_blank" href={link}>
                <img
                    key={idx}
                    alt="icon"
                    className="team-resource-links"
                    src={require(`../../../assets/${key[idx]}.png`)}
                />
            </a>
    })
    return links || null;
}

export default TeamLinks;