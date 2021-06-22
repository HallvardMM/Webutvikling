import React from 'react';
import { mount } from 'enzyme'
import DisplayReviews from './DisplayReviews'
import { IReview } from './Interfaces'
import Typography from '@material-ui/core/Typography';

//File for unit testing of Displayreviews. Using enzyme and jest



jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ({
    })
  }));

  let mockData: Array<IReview>=[{name: 'Test', review: 'I like this film'}];//create mockprops we can use later
  let component;
  test('Check if components recives mock props', () => {
      component = mount(
          <DisplayReviews movieName={'Dummy'} reviews ={mockData}></DisplayReviews>
      )//create object we can tets
      expect(component.props()).toStrictEqual({movieName: 'Dummy', reviews: mockData})//chekcs that the objects gets the props right
  });

  test('Check if it detects that mockdata is emmpty', () => {
    component = mount(
        <DisplayReviews movieName={'Dummy'} reviews={mockData}></DisplayReviews>
    )
    mockData=[]//changes the mocdata to an empty list
    expect(component.props()).not.toStrictEqual({movieName: 'Dummy', reviews: []})//tests that the component notice the empy list
});

test('Check if moviename is wrong', () => {
    component = mount(
        <DisplayReviews movieName={'Dummy'} reviews={mockData}></DisplayReviews>
    )
    expect(component.props()).not.toStrictEqual({movieName: 'hei', reviews: mockData})//tests that it detects the false name
});

test('Check if there is only one Typhography, this means there are  no reviews yet', () => {
    component = mount(
        <DisplayReviews movieName={'Dummy'} reviews={[]}></DisplayReviews>
    )
    expect(component.find(Typography).length).toEqual(1);//check that the numboer of typography in teh object is correct
});






