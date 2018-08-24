import { GithubActivityPullRequest, GithubActivityIssue } from './GithubActivity';
import TeamStandupCard from './TeamStandupCard';
// i deleted the reference to it here? but it wasnt being used

const NewsfeedItems = {
    // NewsfeedVoyage: NewsfeedVoyage,
    NewsfeedStandup: TeamStandupCard,
    GithubActivityIssue: GithubActivityIssue,
    GithubActivityPullRequest: GithubActivityPullRequest
}

export default NewsfeedItems;