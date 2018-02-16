import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getCountries from '../../queries/getCountries';
import Flag from './Flag';

class FlagContainer extends Component {
	state = {
		// countryToggle: false, This is to assumably add in the component to 'view' the members of a certain country.
		// currentCountry: 'Unknown',
		// currentFlag: 0,
		// members: []
	};
	render(){
	let countries = null;//By default we want countries to have nothing inside.

	//console.log(this.props.countries.countries); Debugging
	
	if(this.props.countries.countries){//This checks to see if we successfully grabbed the countries data.
		countries = this.props.countries.countries.map((country)=>{//We map through the countries array and display a <flag> component for each component
			return <Flag key={country.id} country={country.id} memberCount={5} title={country.name} />
		})//memberCount will be implemented as soon as it is supported in the API?
	}
	return(
	<div className='flagContainer'>
		<div className='flagHeader'>
			<h1 className='flagHeading'>Countries</h1>
			<p>We have members from all over the world!</p>
		</div>
		<div className='flagItemContainer'>
		{
		countries
		}
		</div>
	</div>
	);
	}
}

export default graphql(getCountries, {
    name: "countries",
    options: {
      variables: {
        limit: 250
      }
    }
  })(FlagContainer);