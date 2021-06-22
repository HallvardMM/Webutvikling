import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useSelector } from 'react-redux';

import { selectTableText } from '../../reducers/themeReducer';
import Review from '../review/Review';

import { IMovieData } from './Interfaces';

export default function Row(props: { row: IMovieData }) {
    const tableText = useSelector(selectTableText); //Styling from redux

    //Styling for rows
    const useRowStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& > *': {
                    borderBottom: 'unset',
                },
            },
            text: {
                color: tableText
            },
        })
    );
    const { row } = props; //Props passed form Table
    const [open, setOpen] = React.useState(false); //Should the row be open?
    const classes = useRowStyles(); //styling

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton classes={{ root: classes.text }} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "20%" }} component="th" scope="row" >{row.name}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "12.5%" }} align="right">{row.genre}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "20%" }} align="right">{row.director}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "12.5%" }} align="right">{row.country}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "7.5%" }} align="right">{row.runtime}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "7.5%" }} align="right">{row.year}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "10%" }} align="right">{row.score}</TableCell>
                <TableCell classes={{ root: classes.text }} style={{ width: "10%" }} align="right">{row.rating}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit
                    /* Under is the elements which are shown when row is open*/>
                        <Box margin={1}>
                            <Typography classes={{ root: classes.text }} variant="h6" gutterBottom component="div">
                                More&nbsp;Information
                </Typography>
                            <Table size="small" aria-label="info">
                                <TableHead>
                                    <TableRow>
                                        <TableCell classes={{ root: classes.text }}>Company</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Country</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Budget</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Gross</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Released</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Star</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Votes</TableCell>
                                        <TableCell classes={{ root: classes.text }}>Writer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.name}>
                                        <TableCell classes={{ root: classes.text }} component="th" scope="row">{row.company}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.country}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.budget}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.gross}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.released}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.star}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.votes}</TableCell>
                                        <TableCell classes={{ root: classes.text }}>{row.writer}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Review movieId={row._id} movieName={row.name} ></Review>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
