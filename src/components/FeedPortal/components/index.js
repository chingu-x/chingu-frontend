import { GithubActivityPullRequest, GithubActivityIssue } from './GithubActivity';
import { NewsfeedVoyage, NewsfeedAvailableStandup } from './ChinguCards';
import NewsfeedStandup from './NewsfeedStandup';

const NewsfeedItems = {
    NewsfeedVoyage,
    NewsfeedStandup,
    NewsfeedAvailableStandup,
    GithubActivityIssue,  
    GithubActivityPullRequest,
};

export default NewsfeedItems;