import React from 'react';
import { mount } from 'enzyme'
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import Main from './maincomponents/Main'
import Registration from './maincomponents/Registration'

// Test of routing using jest and enzyme

jest.mock('react-redux', () => ({
  useDispatch: () => { },
  useSelector: () => mockData
}));
let mockData: String = 'Test';
let component;
test('Check if routing to registration works', () => {
  component = mount(
    <MemoryRouter initialEntries={['/registration']}>
      <App />
    </MemoryRouter>);
  expect(component.find(Main)).toHaveLength(0);
  expect(component.find(Registration)).toHaveLength(1);
});



