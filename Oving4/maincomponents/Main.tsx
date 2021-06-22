/*Main page showing film data and allowing sorting, filtiring and searching*/

import React from 'react';
import Table from '../features/table/Table';
import Filter from '../features/filter/Filter';
import Navbar from '../features/navbar/Navbar';
import { View } from 'react-native';


export default function main() {
    return (
        <View>
            <Navbar></Navbar>
            <Filter></Filter>
            <Table></Table>
        </View>
    );
}