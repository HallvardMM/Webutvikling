import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { selectTableHeader, selectTableText } from '../../reducers/themeReducer';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';

import { IMovieData, Order, HeadCell, MainTableHeadProps } from './Interfaces';

// Info for the cloumn heads
const headCells: HeadCell[] = [
    { id: 'name', first: true, numeric: false, disablePadding: true, label: 'Movie title' },
    { id: 'genre', first: false, numeric: false, disablePadding: false, label: 'Genre' },
    { id: 'director', first: false, numeric: false, disablePadding: false, label: 'Director' },
    { id: 'country', first: false, numeric: false, disablePadding: false, label: 'Country' },
    { id: 'runtime', first: false, numeric: true, disablePadding: false, label: 'Runtime' },
    { id: 'year', first: false, numeric: true, disablePadding: false, label: 'Year' },
    { id: 'score', first: false, numeric: true, disablePadding: false, label: 'Score' },
    { id: 'rating', first: false, numeric: true, disablePadding: false, label: 'Rating' },
];

// Material ui sorts on string not number like mongoDB
function orderToString(order: Order) {
    if (order === 1) {
        return "asc"
    }
    return "desc"
}

export default function MainTableHead(props: MainTableHeadProps) {
    // Styling from redux
    const tableHeader = useSelector(selectTableHeader);
    const tableText = useSelector(selectTableText);

    //Styling
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            visuallyHidden: {
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                top: 20,
                width: 1,
            },
            tableHead: {
                background: tableHeader,
                color: tableText,
                "& .MuiTableSortLabel-root.MuiTableSortLabel-active": {
                    color: tableText
                },
                "& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon": {
                    color: tableText
                }
            },
            tableText: {
                color: tableText
            }
        })
    )

    const classes = useStyles(); //Style
    const { order, orderBy, onRequestSort } = props; //Rename of props to make more readable code

    //Handling of sorting
    const createSortHandler = (property: keyof IMovieData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    //Returns a tablecell for each headcell/columnhead
    return (
        <TableHead>
            <TableRow classes={{ root: classes.tableHead }}>
                <TableCell classes={{ root: classes.tableHead }} />
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        classes={{ root: classes.tableHead }}
                        align={headCell.first ? 'left' : 'right'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? orderToString(order) : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            classes={{ active: classes.tableText }}
                            direction={orderBy === headCell.id ? orderToString(order) : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === -1 ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

