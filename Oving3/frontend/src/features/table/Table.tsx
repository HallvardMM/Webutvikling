import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import { selectDirector, selectGenre, selectYear, selectRating } from '../../reducers/filterReducer';
import { selectSearch } from '../../reducers/searchReducer';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';



import MainTableHead from './Tablehead';
import Row from './Row';
import { IMovieData, IReqFilms, Order } from './Interfaces';
import { selectTable, selectTableHeader, selectTableText } from '../../reducers/themeReducer';

export default function MainTable() {
  // Styling from redux
  const tableText = useSelector(selectTableText);
  const tableBackground = useSelector(selectTable);
  const tableMenu = useSelector(selectTableHeader)

  //Styling for component
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        height: '100%'
      },
      loading: {
        margin: "0.5rem"
      },
      table: {
        background: tableBackground,
      },
      text: {
        color: tableText
      },
      selectDropDown: {
        color: tableText,
        backgroundColor: tableMenu
      }
    })
  )

  const classes = useStyles(); //styling
  const [page, setPage] = React.useState(0); //Page number
  const [rowsPerPage, setRowsPerPage] = React.useState(25); //Rows per page
  const [order, setOrder] = React.useState<Order>(1); //Order of sorting asc=1 desc=-1
  const [orderBy, setOrderBy] = React.useState<keyof IMovieData>('name'); //Which field to sort
  const [movieRows, setMovieRows] = React.useState<IMovieData[]>([]); //Moviw rows fetched from DB
  const [isLoading, setIsLoading] = React.useState(true);//Is table fetching data?
  const [count, setCount] = React.useState(0); //Number of rows which matches query fetched from DB
  const [error, setError] = React.useState(false); //Error fetching?

  // Filter states and name search from redux
  const search = useSelector(selectSearch);
  const genre = useSelector(selectGenre);
  const director = useSelector(selectDirector);
  const rating = useSelector(selectRating);
  const year = useSelector(selectYear);

  React.useEffect(() => {
    // Fetch new rows and count when query changes.
    setError(false)
    setIsLoading(true)
    setPage(0);
    setCount(0);
    const requestFilms: IReqFilms = {
      name: search,//Import from SearchRedux
      year: year,//Import from filterRedux
      genre: genre,//Import from filterRedux
      director: director, //Import from filterRedux
      rating: rating, //Import from filterRedux
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      sortField: orderBy,
      sortNumber: order
    }
    const body = JSON.stringify(requestFilms)
    fetch('http://localhost:5000/data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    }).then((res) => res.json()).then(
      (result) => {
        if (result.error) {
          //Error from fetch
          setError(true)
        }
        else {
          //Data fetched
          setMovieRows(result.movies)
          setIsLoading(false)
          setCount(result.count)
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, orderBy, order, search, year, genre, director, rating]);

  React.useEffect(() => {
    // Fetch new rows when pagequery changes.
    setError(false)
    setIsLoading(true)
    setCount(0)
    const requestFilms: IReqFilms = {
      name: search,//Import from SearchRedux
      year: year,//Import from filterRedux
      genre: genre,//Import from filterRedux
      director: director,//Import from filterRedux
      rating: rating,//Import from filterRedux
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      sortField: orderBy,
      sortNumber: order
    }
    const body = JSON.stringify(requestFilms)
    fetch('http://localhost:5000/data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    }).then((res) => res.json()).then(
      (result) => {
        if (result.error) {
          //Error from fetch
          setError(true)
        }
        else {
          //Set data and rows
          setMovieRows(result.movies)
          setCount(result.count)
          setIsLoading(false)
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IMovieData) => {
    // Which field should be sorted and which order. When sorted 
    if (property === orderBy) {
      if (order === 1) { setOrder(-1) }
      else { setOrder(1) }
    }
    else {
      setOrderBy(property);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    //Set new page
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Set new number of rows per page
    setRowsPerPage(+event.target.value);
  };
  return (
    <Paper id="paper" className={classes.root} classes={{ root: classes.table }}>
      <TableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <MainTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          {error ? <Typography variant="body1" gutterBottom component="div" classes={{ root: classes.text }}>
            The query triggered an error...
          </Typography> :
            <TableBody>{
              movieRows.map((movieRows, index) => (
                <Row key={movieRows._id} row={movieRows} />
              ))}</TableBody>}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        className={classes.text}
        SelectProps={{
          MenuProps: { classes: { paper: classes.selectDropDown } }
        }}
        count={count}
        labelDisplayedRows={({ from, to, count }) => isLoading ? "Loading..." : `${from}-${to} of ${count}`}
        rowsPerPage={rowsPerPage}
        page={isLoading ? 0 : page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper >
  );
}
