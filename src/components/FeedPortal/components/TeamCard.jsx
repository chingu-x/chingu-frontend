import * as React from 'react';
import { Link } from 'react-router-dom';
import './TeamCard.css';
import InfoComponents from './InfoComponents';
import TeamLinks from './TeamLinks';

const TeamCard = ({ user: { available_standups }, team }) => {
	let editorIsVisible = false;

	const availableStandup =
		!!available_standups.length && available_standups.find(su => su.team.id === team.id);

	const standupStatus = availableStandup ? '' : '--disabled';

	const toggleEditorVisibility = () => {
		editorIsVisible = !editorIsVisible;
	};

	return (
		<div className="team-card-container">
			<div className="team-card-info-container">
				<InfoComponents team={team} />
			</div>
			<div className="team-card-buttons-container">
				<Link to={'#'} className="user-btn--disabled">
					Team Workspace
				</Link>
				<Link to={'/project/' + team.project.id} className="user-btn">
					Project Page
				</Link>
				<Link
					className={`user-btn${standupStatus}`}
					to={availableStandup ? `/team/standup/${availableStandup.id}` : '#'}
				>
					{availableStandup ? 'Submit Standup' : 'No Standup Available'}
				</Link>

				<div className="team-resource-links-container">
					<img
						alt="edit links"
						className="team-resource-links"
						src={require(`../../../assets/links.png`)}
						onClick={() => toggleEditorVisibility()}
					/>
					{team.project && <TeamLinks project={team.project} />}
				</div>
			</div>
		</div>
	);
};

export default TeamCard;
