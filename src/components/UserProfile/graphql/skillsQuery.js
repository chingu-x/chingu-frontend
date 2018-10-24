import { gql } from "apollo-boost"

const skillsQuery = gql`
  query skillsQuery {
   frontend: skills(category: frontend) {
        id
        name
        category
  }
	frontend_dependency: skills(category: frontend_dependency) {
        id
        name
        category
  }
  backend: skills(category: backend) {
        id
        name
        category
  }
	backend_dependency: skills(category: backend_dependency) {
        id
        name
        category
  }
  database: skills(category: database) {
        id
        name
        category
  }
}
`

export default skillsQuery