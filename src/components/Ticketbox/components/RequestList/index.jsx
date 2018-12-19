import React from 'react';
import { gql } from 'apollo-boost';
import { Request } from '../../../utilities';
import HelpRequestCard from './HelpRequestCard';

class RequestList extends React.Component {
  render() {
    // todo: if allow filter by status or request_type manage state of filter tabs
    // filter client side or move <Request /> query to be managed by RequestList
    const { data: { user } } = this.props;
    if (!user) return null;

    const { help_requests } = user;
    if (!help_requests.length) return 'No help requests created';

    return (
      <div className="bug-suggestion-box">
        {help_requests.map(HelpRequestCard)}
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

        ... on ChangeProject {
          type: __typename
        }

        ... on InactiveMember {
          type: __typename
        }
      }
    }
  }
`;

export default () => (
  <Request
    query={userRequestListQuery}
    component={RequestList}
  />
);
