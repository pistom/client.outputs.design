import React from 'react';
import { shallow } from 'enzyme';
import Ecran from 'components\Ecran.js';

describe('<Ecran />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Ecran />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "ecran-component"', function () {
      expect(component.hasClass('ecran-component')).to.equal(true);
    });
  });
});
