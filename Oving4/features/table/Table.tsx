/*Table Component used to siplay filmes on main page */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; //Global state managment
import { GET_DIRECTOR, GET_GENRE, GET_YEAR, GET_RATING, SET_SORT, GET_SORT, GET_SEARCH } from '../../reducers/filterReducer'; //Global state managment data logic
import { GET_BUTTON_COLOR, GET_TEXT_COLOR, GET_SECONDARY_COLOR, GET_PRIMARY_COLOR } from '../../reducers/themeReducer'; //Global state managment color logic
import { View } from 'react-native';
import { DataTable, Text, Button, DefaultTheme } from 'react-native-paper';
import SortPicker from './SortPicker' //Chose sort by order in portrait mode
import { useOrientation } from '../../components/useOrientation'; //Is phone in portrait or landscape mode?
import MainTableHead from './Tablehead'; //Data table head
import Row from './Row'; //Data table row
import { IMovieData, IReqFilms, Order } from './Interfaces'; //Interfaces and types

export default function MainTable() {
    const [page, setPage] = React.useState(0); //Page number
    const rowsPerPage = 10; //Rows per page is set on phone
    const [order, setOrder] = React.useState<Order>(1); //Order of sorting asc=1 desc=-1
    const dispatch = useDispatch() //Global state managment
    const reduxOrderBy = useSelector(GET_SORT) //Global state managment which column should be order by
    const [movieRows, setMovieRows] = React.useState<IMovieData[]>([]); //Moviw rows fetched from DB
    const [isLoading, setIsLoading] = React.useState(true);//Is table fetching data?
    const [count, setCount] = React.useState(0); //Number of rows which matches query fetched from DB
    const [error, setError] = React.useState(false); //Error fetching?
    const [showSort, setShowSort] = React.useState(false); //Show sortby option 
    let portrait = useOrientation() //Is phone in portrait mode?

    //redux colors
    const buttonColor = useSelector(GET_BUTTON_COLOR)
    const secondaryColor = useSelector(GET_SECONDARY_COLOR)
    const primaryColor = useSelector(GET_PRIMARY_COLOR)
    const textColor = useSelector(GET_TEXT_COLOR)

    // Filter states and name search from redux
    const search = useSelector(GET_SEARCH);
    const genre = useSelector(GET_GENRE);
    const director = useSelector(GET_DIRECTOR);
    const rating = useSelector(GET_RATING);
    const year = useSelector(GET_YEAR);

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            text: textColor
        },
    };

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
            sortField: reduxOrderBy, //Import from filterRedux
            sortNumber: order
        }
        const body = JSON.stringify(requestFilms)
        fetch('http://it2810-65.idi.ntnu.no:3000/data', {
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
    }, [rowsPerPage, reduxOrderBy, order, search, year, genre, director, rating]);

    React.useEffect(() => {
        // Fetch new rows when pagequery changes.
        setError(false)
        setIsLoading(true)
        setCount(0)
        const requestFilms: IReqFilms = {
            name: search,//Import from SearchRedux
            year: year,//Import from filterRedux
            genre: genre,//Import from filterRedux
            director: director, //Import from filterRedux
            rating: rating, //Import from filterRedux
            limit: rowsPerPage,
            skip: page * rowsPerPage,
            sortField: reduxOrderBy, //Import from filterRedux
            sortNumber: order
        }
        const body = JSON.stringify(requestFilms)
        fetch('http://it2810-65.idi.ntnu.no:3000/data', {
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

    const handleRequestSort = (property: keyof IMovieData) => {
        // Which field should be sorted and which order. When sorted 
        if (property === reduxOrderBy) {
            if (order === 1) { setOrder(-1) }
            else { setOrder(1) }
        }
        else {
            dispatch(SET_SORT({ reduxSort: property }));
        }
    };

    const handleChangePage = (newPage: number) => {
        //Set new page
        setIsLoading(true);
        setPage(newPage);
    };

    return (
        <View style={{ width: "100%", justifyContent: "center", backgroundColor: secondaryColor }}>
            {portrait && <Button style={{ width: "93.4%", marginLeft: "3.3%", marginTop: "2%", backgroundColor: buttonColor }} mode="contained" onPress={() => setShowSort(true)}>Sort On</Button>}
            {(portrait && showSort) && <SortPicker closePicker={setShowSort}></SortPicker>}
            <DataTable style={{ width: "100%" }}>
                <MainTableHead
                    order={order}
                    onRequestSort={handleRequestSort}
                />
                {error ? <Text style={{ color: textColor }}>
                    The query triggered an error...
          </Text> :
                    movieRows.map((movieRows) => (
                        <Row key={movieRows._id} row={movieRows} />
                    ))
                }
                <DataTable.Pagination
                    numberOfPages={count}
                    theme={theme}
                    style={{ backgroundColor: primaryColor }}
                    label={<Text style={{ color: textColor }}>{isLoading ? "Loading..." : `${rowsPerPage * page + 1}-${rowsPerPage * page + rowsPerPage} of ${count}`}</Text>}
                    page={isLoading ? 0 : page}
                    onPageChange={page => { handleChangePage(page) }}
                />
            </DataTable >
        </View>
    );
}
