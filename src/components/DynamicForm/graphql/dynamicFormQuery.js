import { gql } from "apollo-boost"

export default gql`
  query getDynamicForm(
    $purpose:FormPurposeEnum!
    $version:Int){
      user {
        id
        status
      }
    form(
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