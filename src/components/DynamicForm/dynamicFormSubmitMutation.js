import { gql } from "apollo-boost";

const dynamicFormSubmitMutation = gql`
  mutation dynamicFormSubmit(
    $purpose: FormPurposeEnum!
    $version: Int
    $form_data: JSON!
  ) {
    formSubmit(
      purpose: $purpose,
      version: $version,
      form_data: $form_data
    ) {
      id
    }
  }
`;

export default dynamicFormSubmitMutation;
