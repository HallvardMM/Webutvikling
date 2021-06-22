import React from 'react';
import { mount, shallow } from 'enzyme'
import Main from './Main'
import Table from '../features/table/Table';
import Filter from '../features/filter/Filter';
import Navbar from '../features/navbar/Navbar';

//Test to check if Main component renders with component Table, Filter,Navbar

test('Check if Table is set', () => {
    const component = shallow(
        <Main></Main>);
    expect(component.contains(<Table></Table>)).toBeTruthy();
});

test('Check if Filter is set', () => {
    const component = shallow(
        <Main></Main>);
    expect(component.find(Filter)).toHaveLength(1);
});

test('Check if Navbar is set', () => {
    const component = shallow(
        <Main></Main>);
    expect(component.find(Navbar)).toHaveLength(1);
});