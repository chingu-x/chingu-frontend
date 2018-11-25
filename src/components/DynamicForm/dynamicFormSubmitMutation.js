import { gql } from "apollo-boost";

const dynamicFormSubmitMutation = gql`
  mutation dynamicFormSubmit(
    $purpose: FormPurposeEnum!
    $version: Int
    $form_data: JSON!
  ) {
    userFormSubmit(
      purpose: $purpose,
      version: $version,
      form_data: $form_data
    ) {
      id
      user {
        id
        status
      }
    }
  }
`;

export default dynamicFormSubmitMutation;
