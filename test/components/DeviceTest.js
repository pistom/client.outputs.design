import React from 'react';
import { shallow } from 'enzyme';
import Device from 'components\Device.js';

describe('<Device />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Device />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "device-component"', function () {
      expect(component.hasClass('device-component')).to.equal(true);
    });
  });
});
