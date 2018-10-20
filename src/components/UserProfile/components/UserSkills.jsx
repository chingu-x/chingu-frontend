import React from "react";

import UserAcquiredSkills from "./UserAcquiredSkills";
import UserDesiredSkills from "./UserDesiredSkills";

const UserSkills = ({ user, editable }) => (
  <React.Fragment>
    <UserAcquiredSkills user={user} editable={editable} />
    <UserDesiredSkills user={user} editable={editable} />
  </React.Fragment>
);

export default UserSkills;
