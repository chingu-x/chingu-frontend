import { gql } from "apollo-boost"

const allProjectsQuery = gql`
    query allProjects {
        projects(limit: 20) {
            id
            title
        	elevator_pitch
            images(only_main:true) {
                id
                order
                url
            }
        }
    }
`

export default allProjectsQuery