import { client } from "../../index"
import { gql } from "apollo-boost"

const toggleLoader = gql`
  mutation toggleLoader($isShowing: Boolean) {
    toggleLoader(isShowing: $isShowing) @client 
  }
`

export default loading => {
  client.mutate({
    mutation: toggleLoader,
    variables: { isShowing: !!loading }
  })
  return !!loading
}