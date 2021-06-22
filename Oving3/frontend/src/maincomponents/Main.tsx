import React from 'react';
import Table from '../features/table/Table';
import Filter from '../features/filter/Filter';
import Navbar from '../features/navbar/Navbar';

// Components on main page

export default function main() {
    return (
        <div>
            <Navbar></Navbar>
            <Filter></Filter>
            <Table></Table>
        </div>
    );
}