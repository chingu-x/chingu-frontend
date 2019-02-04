import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../components/Footer/Footer';

test('Footer tbd', async () => {
  // Render a Footer
  const footer = shallow(<Footer />);
  console.log('footer hasClass("connection-icon"): ', footer.hasClass('connection-icon'));

  expect(footer.hasClass('connection-icon')).toBe(true) // Just for validating Jest setup
});