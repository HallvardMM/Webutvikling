/*Component used in top of data table */

import React from 'react';
import { DataTable } from 'react-native-paper';
import { Order, MainTableHeadProps, HeadCell } from './Interfaces'; //Interfaces 
import { useOrientation } from '../../components/useOrientation'; // Is phone in portrait or landscape?
import { useSelector } from 'react-redux'; //Global state managment
import { GET_SORT } from '../../reducers/filterReducer'; //Global state managment sort logic


//Id and name for all coloumn heads
const headCells: HeadCell[] = [
    { id: 'name' },
    { id: 'genre' },
    { id: 'director' },
    { id: 'country' },
    { id: 'runtime' },
    { id: 'year' },
    { id: 'score' },
    { id: 'rating' },
];

// React native paper sorts on string not number like mongoDB
function orderToString(order: Order) {
    if (order === 1) {
        return "ascending"
    }
    return "descending"
}

export default function MainTableHead(props: MainTableHeadProps) {
    const { order, onRequestSort } = props; //Rename of props to make more readable code
    const reduxOrderBy = useSelector(GET_SORT) //which column to sort on
    let portrait = useOrientation() //Is phone in portrait mode?

    if (portrait) {//Phone is in portrait mode show film name and sort coloumn
        return (
            <DataTable.Header>
                <DataTable.Title
                    key={'Order name'}
                    sortDirection={reduxOrderBy === 'name' ? orderToString(order) : undefined}
                    onPress={() => onRequestSort('name')}
                >
                    NAME
                    </DataTable.Title>
                <DataTable.Title
                    key={'Order' + reduxOrderBy}
                    sortDirection={reduxOrderBy !== 'name' ? orderToString(order) : undefined}
                    onPress={() => { reduxOrderBy === 'name' ? onRequestSort('director') : onRequestSort(reduxOrderBy) }}
                >
                    {reduxOrderBy === 'name' ? 'DIRECTOR' : reduxOrderBy.toUpperCase()}
                </DataTable.Title>
            </DataTable.Header >
        );
    }

    else { //Phone is in landscape mode show all coloumns
        return (
            <DataTable.Header>
                {headCells.map((headCell) => (
                    <DataTable.Title
                        key={headCell.id}
                        sortDirection={reduxOrderBy === headCell.id ? orderToString(order) : undefined}
                        onPress={() => onRequestSort(headCell.id)}
                    >
                        {headCell.id}
                    </DataTable.Title>
                ))}
            </DataTable.Header>
        );

    }

}