import React from 'react';
import { gql } from 'apollo-boost';
import { Request } from '../../../utilities';
import Loader from '../../../Loader';
import BackBtn from '../BackBtn';
import HelpRequestCard from './HelpRequestCard';

class RequestList extends React.Component {
  render() {
    const { data: { user }, loading, switchRenderedType } = this.props;

    let toRender;
    // todo: div wrapper to customize styling / positioning?
    if (loading) toRender = <Loader size="small" />;
    else {
      const { help_requests } = user;
      if (!help_requests.length) return 'No help requests created';
      toRender = help_requests.map(HelpRequestCard);
    }
    // todo: if allow filter by status or request_type manage state of filter tabs
    // filter client side or move <Request /> query to be managed by RequestList
    
    return (
      <div className="bug-suggestion-box">
        {toRender}
        <BackBtn type="center" path={""} switchRenderedType={switchRenderedType} />
      </div>
    );
  }
};

const userRequestListQuery = gql`
  query userRequestListQuery(
    # todo: remove args if managing filtering client side
    $status: HelpRequestStatus
    $request_type: ProjectHelpRequestType
  ) {
    user {
      id
      # todo: remove args if managing filtering client side
      help_requests(status: $status, request_type: $request_type) {
        id
        status
        context
        created_at
        resolved_at
        admin_notes
        ... on HelpRequest { type: __typename }
        ... on ChangeProject { type: __typename }
        ... on InactiveMember { type: __typename }
      }
    }
  }
`;

export default props => (
  <Request
    {...props}
    loader={false}
    query={userRequestListQuery}
    component={RequestList}
  />
);
