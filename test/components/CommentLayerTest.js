import React from 'react';
import { shallow } from 'enzyme';
import CommentLayer from 'components\CommentLayer.js';

describe('<CommentLayer />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<CommentLayer />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "commentlayer-component"', function () {
      expect(component.hasClass('commentlayer-component')).to.equal(true);
    });
  });
});
