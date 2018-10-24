import * as React from "react";
import { DynamicFormContainer } from '../../../DynamicForm/components';
import Request from "../../../utilities/Request"
import skillsQuery from "../../graphql/skillsQuery";
import { client } from "../../../../index.js";
import FormError from '../../../Error/FormError';
import EditButton from '../../../common/EditButton';
import Modal from '../../../common/Modal'
import { gql } from "apollo-boost";

const userAddDesiredSkills = gql`
mutation addDesiredSkills ($skill_ids:[ID!]!) {
  userAddDesiredSkills(skill_ids:$skill_ids) {
    id
    desired_skills {
      id
      name
      category
    }
  }
}
`;

const fillArray = (sourceArray, size) => {
  const copy = sourceArray.slice();
  let fillSize = size - copy.length;
  while (fillSize--) copy.push(null);
  return copy;
}

/**
 * @prop {string} mutation  skill / desired_skill mutation
 * @prop {string} mutationName 
 * @prop {string} fieldName skills / desired_skills
 * @prop {array} headerText form header
 * @prop {function} updateSkills saves returned form data to parent components state
 */

const QA = {
  text: "Desired Skills",
  input_type: 'skill_setter',
  field_name: 'skill_ids',
  subtext: <React.Fragment>
    Please drag up to 5 skills from the left panel to the right panel in order of importance.
    The skill order will be used to find other teammates that best matches your skills.
      <br />
    <i>Please do not leave gaps between chosen skill cards.</i>
  </React.Fragment>
}
class DesiredSkillsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  onSubmit = (formData) => {
    const variables = {};
    variables.skill_ids = formData.skill_ids.reduce(
      (selectedSkills, skill) => {
        // ignore null skills
        if (!skill) return selectedSkills;
        // 
        return [...selectedSkills, skill.id || skill];
      },
      [],
    );
    client.mutate({
      mutation: userAddDesiredSkills,
      variables,
    }).then(this.popup.close)
      .catch(error => this.setState({ error }));
  }

  render() {
    // fills to length 5 adding 'null' elements as needed
    const chosenSkills = fillArray(this.props.chosenSkills, 5);
    return (
      <React.Fragment>
        {!this.props.loading && <EditButton onClick={() => this.popup.open()} />}
        <Modal ref={el => this.popup = el} background='none'>
          <div className="skill-modal" >
            {
              this.state.error // TODO: Check if modal is still open on rerender
                ? <FormError error={this.state.error.message} />
                : <DynamicFormContainer
                  questions={[{ ...QA, options: [this.props.data] }]}
                  onSubmit={this.onSubmit}
                  initialData={ { skill_ids: chosenSkills }}
                />
            }
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default props => (
  <Request
    {...props}
    query={skillsQuery}
    component={DesiredSkillsPicker}
  />
);