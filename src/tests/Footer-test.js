import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/Footer/Footer';

describe('Footer page component', () => {
  const footer = shallow(<Footer />); // TODO: move to setup

  // Validate the structural integrity of the page
  test('contains expected literals', () => {
    // Render a Footer
    console.log('footer: ', footer.debug());

    const texts = footer.find('.footer-subtitle').map(node => node.text());
    const expectedLiterals = ['Contact Us', 'Company'];
    expect(texts).toEqual(expect.arrayContaining(expectedLiterals));
  });

  // Validate the functionality on the page
  test('test navigatablity of react-router Link components', () => {
    const links = footer.find('.footer-link').map(node => {
      const linkPage = node.simulate("click");
      console.log('linkePage: ', linkPage.debug());
    });
  });
});