import React from 'react';
import { shallow } from 'enzyme';
import Home from 'components\Home.js';

describe('<Home />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Home />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "home-component"', function () {
      expect(component.hasClass('home-component')).to.equal(true);
    });
  });
});
