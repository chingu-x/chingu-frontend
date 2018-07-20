import * as React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SubmitVoyageApplication extends React.Component {
    submit = async () => {
        let params = {
            q100: this.state[100],
            q101: this.state[101],
            q102: this.state[102],
            q103: this.state[103],
            q104: this.state[104],
            q105: this.state[105]
        };
        // if (this.props.state.application.length > 2) {
        //     params = {
        //         1: this.state[1],
        //         2: this.state[2],
        //         3: this.state[3],
        //         4: this.state[4],
        //         5: this.state[5],
        //         6: this.state[6],
        //         7: this.state[7],
        //         8: this.state[8],
        //         9: this.state[9],
        //         10: this.state[10],
        //         11: this.state[11],
        //         12: this.state[12],
        //         13: this.state[13],
        //         14: this.state[14],
        //         100: this.state[100],
        //         101: this.state[101],
        //         102: this.state[102],
        //         103: this.state[103],
        //         104: this.state[104],
        //         105: this.state[105]
        //     }
        // } else {
        //     params = {
        //         100: this.state[100],
        //         101: this.state[101],
        //         102: this.state[102],
        //         103: this.state[103],
        //         104: this.state[104],
        //         105: this.state[105]
        //     }
        // }
        await this.props.submitVoyageApplication({
            variables: {params}
        })
    }
    render() {
        return (
            <button onClick={this.submit()} className="voyage-appliation-btn--green">Submit</button>
        )
    }
}

const SUBMIT_VOYAGE_APPLICATION = gql`
    mutation SubmitVoyageApplication(
        $q100: String!,
        $q101: [String!]!,
        $q102: String!,
        $q103: String!,
        $q104: String!,
        $q105: String!
    ) {
        post($q100: String!,
            $q101: [String!]!,
            $q102: String!,
            $q103: String!,
            $q104: String!,
            $q105: String!
        ) {}
    }
`
export default graphql(SUBMIT_VOYAGE_APPLICATION, {name: 'submitVoyageApplication'}) (SubmitVoyageApplication)