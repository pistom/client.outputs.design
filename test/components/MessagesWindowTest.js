import React from 'react';
import { shallow } from 'enzyme';
import MessagesWindow from 'components\MessagesWindow.js';

describe('<MessagesWindow />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<MessagesWindow />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "messageswindow-component"', function () {
      expect(component.hasClass('messageswindow-component')).to.equal(true);
    });
  });
});
