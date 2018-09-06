import { gql } from "apollo-boost";

const dynamicFormQuery = gql`
  query dynamicFormQuery(
    $purpose:FormPurposeEnum!
    $version:Int
  ) {
    dynamicFormData: form(
      purpose:$purpose
      version: $version
    ) {
      id
      purpose
      version
      questions {
        id
        field_name
        text
        subtext
        input_type
        options
        minlength
        maxlength
      }
    }
  }
`;

export default dynamicFormQuery;
