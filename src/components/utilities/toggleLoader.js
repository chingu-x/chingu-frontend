import { client } from "../../index"
import { gql } from "apollo-boost"

const toggleLoaderQuery = gql`
  mutation toggleLoader($isShowing: Boolean) {
    toggleLoader(isShowing: $isShowing) @client 
  }
`
/**
 * NOTES
 * Mutation that saves loading state to store .loaderState for use by global Loader instance
 * Use in Query/Mutation components to toggle loading flag on/off
 * 
 * example <Query>
 *   {({loading, error, data}) => {
 *     toggleLoader(loading) --> to use global Loader instance
 * 
 *     alternatively use <Lodader /> --> to use custom (stylable) Loader instance
 * 
 *     ...handle erros
 *     ...render content
 *   }
 *   }
 * </Query>
 */

const toggleLoader = loading => {
  client.mutate({
    mutation: toggleLoaderQuery,
    variables: { isShowing: !!loading }
  })
  return !!loading
}

export default toggleLoader