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

/**
 * @prop {string} mutation  skill / desired_skill mutation
 * @prop {string} mutationName 
 * @prop {string} fieldName skills / desired_skills
 * @prop {array} headerText form header
 * @prop {function} updateSkills saves returned form data to parent components state
 */
class DesiredSkillsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QA: {
        text: "Desired Skills",
        input_type: 'skill_setter',
        field_name: 'skill_ids',
        subtext: <React.Fragment>
          Please drag up to 5 skills from the left panel to the right panel in order of importance.
          The skill order will be used to find other teammates that best matches your skills.
            <br />
          <i>Please do not leave gaps between chosen skill cards.</i>
        </React.Fragment>,
        options: [{}]
      },
      error: null,
      response: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.updateQA(this.props);
    }
  }

  updateQA = ({ data }) => {
    let QA = this.state.QA;
    QA.options = [data];
    this.setState({ QA });
  }


  handleError = (error) => {
    this.setState({ error });
    setTimeout(() => { this.setState({ error: null }) }, 4000)
  };

  onSubmit = (variables) => {
    client.mutate({
      mutation: userAddDesiredSkills,
      variables,
    }).then(this.popup.close)
      .catch(this.handleError);
  }

  render() {
    let { QA, error } = this.state;

    if (error) { return <FormError error={error.message} /> };

    return (
      <React.Fragment>
        <EditButton onClick={() => this.popup.open()} />
        <Modal ref={el => this.popup = el} background='none'>
          <div className="skill-modal" >
            <DynamicFormContainer
              questions={[QA]}
              onSubmit={this.onSubmit}
            />
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