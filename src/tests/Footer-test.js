import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../components/Footer/Footer';

test('Footer tbd', async () => {
  // Render a Footer
  const footer = shallow(<Footer />);
  console.log('footer: ', footer.debug());

  expect(footer.hasClass('connection-icon')); // Just for validating Jest setup
});