import React from 'react';
import { shallow } from 'enzyme'
import Review from './Review'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//File for unit testing of Reviews. Using enzyme and jest


jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ({
    })
  }));


  let mockID: string= '111';//mock ID to use later
  let mockName: string = 'Test film'//mock name to use later
  let component;
  test('Check if reviwes renders with ', () => {
      component = shallow(
          <Review movieId={mockID} movieName={mockName}></Review>
      )//create object we can test
      expect(component.find(Button).length).toEqual(1);//Tests that the right amount of buttons are in the object
      expect(component.find(Typography).length).toEqual(4);//Tests that the right amount typographys are in the object
  });


test('Check if reviwes renders with header', () => {
    component = shallow(
        <Review movieId={mockID} movieName={mockName}></Review>
    )
    expect(component.props()).not.toStrictEqual({moviID: '111', movieName: 'Test film'})//chekcs that the objects takes tthe right props
    
});

