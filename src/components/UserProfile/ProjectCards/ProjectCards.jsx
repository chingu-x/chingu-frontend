import React, { Fragment } from "react";
import InfoComponents from './InfoComponents';
import { Link } from "react-router-dom"

const ProjectCards = ({ teamsList }) => teamsList.map(team => {
    console.log('should render project cards');
    const { id, images } = team.project
    return (
        <div key={id} className="project-card__container">
            <Link className="project-img" to={`/project/${id}`}>
                <img
                    className="project-img"
                    src={images[0] ? images[0].url : require('../../../assets/landingImage.png')} />
            </Link>
            <div className="project-info__container">
                <InfoComponents team={team} />
            </div>
        </div>
    )
})

export default ProjectCards;