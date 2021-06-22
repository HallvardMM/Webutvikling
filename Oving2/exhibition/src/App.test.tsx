import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import DropDownMenu from './components/Settings';
import Exhibition from './components/Exhibition';
import Sound from './components/sounds/Sound';
import DropDown from './components/DropDown';

test('renders a snapshot', () => {
  //check if the app runs
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('render correctly dropdownmenu', () => {
  //check if dropdownmenu exists
  const dropdownmenu = renderer.create(<DropDownMenu />).toJSON();
  expect(dropdownmenu).toBeTruthy;
});

test('render correctly exhibition', () => {
  //check if exhibition exists
  const exhibition = renderer.create(<Exhibition />).toJSON();
  expect(exhibition).toBeTruthy;
});

test('render correctly dropdown', () => {
  //check if dropdown exists
  const dropdown = renderer.create(<DropDown />).toJSON();
  expect(dropdown).toBeTruthy;
});

test('render correctly sound', () => {
  //check if sound renders
  const Abstract = require('./components/sounds//Abstract.mp3');
  const sound = renderer
    .create(<Sound Option={Abstract} Mute={false} />)
    .toJSON();
  expect(sound).toBeTruthy;
});
