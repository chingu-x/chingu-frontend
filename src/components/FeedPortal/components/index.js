import { GithubActivityPullRequest, GithubActivityIssue } from './GithubActivity';
import { NewsfeedVoyage } from './ChinguCards';
import TeamStandupCard from './TeamStandupCard';

const NewsfeedItems = {
    NewsfeedVoyage: NewsfeedVoyage,
    NewsfeedStandup: TeamStandupCard,
    GithubActivityIssue: GithubActivityIssue,
    GithubActivityPullRequest: GithubActivityPullRequest
}

export default NewsfeedItems;