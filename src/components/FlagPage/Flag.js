import React from 'react';

const Flag = (props) => {
	let countryName = props.title;

	if(props.memberCount <= 0){//What's the point of displaying a country where we dont have any members?
		return (
			<span></span>
		);
	}

	if (countryName.length >= 15) {//Some Countries have really really long names. This limits each name to 15 characters.
		countryName = countryName.split('');
		countryName.splice(15, countryName.length - 15);
		countryName.push('...');//When we cutoff a name, we add ... to symbolise that it isnt the complete name.
		countryName.join('');
	}
	return(
		<div className='countryContainer'>
			<div className={'flagItem flag flag-icon-background flag-icon-' + props.country}>
				<span>{props.memberCount}</span>
			</div>
			<h3>{countryName}</h3>
		</div>
	);
}

export default Flag;