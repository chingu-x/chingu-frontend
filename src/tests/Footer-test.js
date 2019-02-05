import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

// Note that the tests that follow are unit tests since the Footer component
// doesn't have functionality requiring interfaces. At this point in time
// these tests are included mainly to demonstrate the capabilities of 
// Jest/Enzyme and are not representative of the types of tests we actually
// want to standardize on as a team.
describe('Footer page component', () => {
  // Render a Footer component
  const footer = mount(
    <Router>
      <Footer />
    </Router>
  );
  // console.log('footer: ', footer.debug()); // For testing only


  // Validate the structural integrity of the page by validating that elements
  // like buttons, literals, labels, etc. are present
  test('contains expected literals, labels, buttons, etc.', () => {

    const subtitles = footer.find('.footer-subtitle').map(subtitle => subtitle.text());
    const expectedSubtitles = ['Contact Us', 'Company'];
    expect(subtitles).toEqual(expect.arrayContaining(expectedSubtitles));

    const dropdownTitle = footer.find('.footer-dropdown-title').text();
    expect(dropdownTitle).toEqual('Company');

    const buttonText = footer.find('.footer-btn').text();
    expect(buttonText).toEqual('Site Navigation');
  });

  // Validate the functionality of anchor tags not embedded within 
  // React Router Link components
  test('test HTML anchor tags', () => {
    const anchors = footer.find('.connection-icon').map(anchor => {
      const anchorHref = anchor.getDOMNode().getAttribute('href');
      const imageNode = anchor.find('i');
      switch ( anchorHref ) {
        case 'https://medium.com/chingu':
          expect(imageNode.hasClass('fa-medium-m')).toBe(true);
          break;
        case 'https://www.youtube.com/channel/UCS7zmJXbe7FgTC3sHlUf4jw':
          expect(imageNode.hasClass('fa-youtube')).toBe(true);
          break;
        case 'https://github.com/Chingu-cohorts':
          expect(imageNode.hasClass('fa-github')).toBe(true);
          break;
        case 'https://twitter.com/ChinguCollabs':
          expect(imageNode.hasClass('fa-twitter')).toBe(true);
          break;
        default:
          expect(`Unknown HTML anchor href: ${anchorHref}`).toBe(false);
      }
    });
  });

  // Validate the functionality of React Router Link components and any
  // anchor tags embedded inside them.
  test('test react-router Link components', () => {
    const footerLinks = footer.find('Link').map(link => {
      const linkTo = link.props().to;
      const anchor = link.find('a');
      const anchorHref = anchor.getDOMNode().getAttribute('href');
      expect(anchorHref).toEqual(linkTo);
      switch (linkTo) {
        case '/help':
          expect(anchor.text()).toEqual('Help Page');
          break;
        case '/privacy':
          expect(anchor.text()).toEqual('Privacy Policy');
          break;
        case '/team':
          expect(anchor.text()).toEqual('Our Team');
          break;
        default:
        expect(`Unknown Link "to" attribute: ${linkTo}`).toBe(false);
      }
    });
  });

});