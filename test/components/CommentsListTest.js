import React from 'react';
import { shallow } from 'enzyme';
import CommentsList from 'components\CommentsList.js';

describe('<CommentsList />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<CommentsList />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "commentslist-component"', function () {
      expect(component.hasClass('commentslist-component')).to.equal(true);
    });
  });
});
