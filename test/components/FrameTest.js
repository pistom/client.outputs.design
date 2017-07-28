import React from 'react';
import { shallow } from 'enzyme';
import Frame from 'components\Frame.js';

describe('<Frame />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Frame />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "frame-component"', function () {
      expect(component.hasClass('frame-component')).to.equal(true);
    });
  });
});
