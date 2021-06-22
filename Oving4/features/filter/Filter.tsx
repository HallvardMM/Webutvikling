/*Component made to support filitring movie data */
import React from 'react';
import { View, StyleSheet, ScrollView, Modal } from 'react-native'; //Modal used to get a new screen with info
import { Checkbox, Paragraph, Button, Title } from 'react-native-paper';
import { get } from '../../fetch'; //Get data from backend
import { SET_FILTER, GET_DIRECTOR, GET_GENRE, GET_YEAR, GET_RATING } from '../../reducers/filterReducer'; //Globel state managment of filter logic
import { useDispatch, useSelector } from 'react-redux'; //Used for global state managment
import { SET_THEME, GET_BUTTON_COLOR, GET_TEXT_COLOR, GET_PRIMARY_COLOR } from '../../reducers/themeReducer'; //Globel state managment of style logic
import FilterSelect from './FilterSelect';

//Cehck if filter value is already set. 
//Made so user can't query for same filter multiple times
const arrayEquals = (firstArray: string[], secondArray: string[]) => {
    // Function used to check if arrays are equal 
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) {
            return false;
        }
    }
    return true;
}

const filterState = (bool: boolean, func: React.Dispatch<React.SetStateAction<boolean>>, clearfunc: React.Dispatch<React.SetStateAction<string[]>> | React.Dispatch<React.SetStateAction<number[]>>) => {
    // Function used for setting filter to empty when closing filter.
    clearfunc([]);
    func(bool);
}

export default function Filter() {
    // Display filter modal?
    const [filter, setFilter] = React.useState(false);
    //Should the given filter be shown?
    const [filterGenre, setFilterGenre] = React.useState(false);
    const [filterDirector, setFilterDirector] = React.useState(false);
    const [filterYear, setFilterYear] = React.useState(false);
    const [filterRating, setFilterRating] = React.useState(false);
    //Is the applybutton disabled?
    const [applyDisabled, setApplyDisabled] = React.useState(true);
    //List of options to filter on (is fetched from backend)
    const [genreList, setGenreList] = React.useState<string[]>([]);
    const [directorList, setDirectorList] = React.useState<string[]>([]);
    const [yearList, setYearList] = React.useState<string[]>([]);
    const [ratingList, setRatingList] = React.useState<string[]>([]);
    //Lists of the chosen values in the filter
    const [returnGenreList, setReturnGenreList] = React.useState<string[]>([]);
    const [returnDirectorList, setReturnDirectorList] = React.useState<string[]>([]);
    const [returnYearList, setReturnYearList] = React.useState<string[]>([]);
    const [returnRatingList, setReturnRatingList] = React.useState<string[]>([]);
    //Redux states for return lists.
    const director = useSelector(GET_DIRECTOR);
    const rating = useSelector(GET_RATING);
    const genre = useSelector(GET_GENRE);
    const year = useSelector(GET_YEAR);
    const dispatch = useDispatch();
    const [toggle, setToggle] = React.useState("blue");
    //Redux states for styling
    const primaryColor = useSelector(GET_PRIMARY_COLOR);
    const textColor = useSelector(GET_TEXT_COLOR)
    const buttonColor = useSelector(GET_BUTTON_COLOR)

    //Toggle between color themes
    const handleClick = () => {
        if (toggle === "fall") {
            dispatch(SET_THEME("blue"))
            setToggle("blue")
        }
        else if (toggle === "blue") {
            dispatch(SET_THEME("dark"))
            setToggle("dark")
        }
        else {
            dispatch(SET_THEME("fall"))
            setToggle("fall")
        }
    }


    const applyFilter = () => {
        //set filter in global state
        dispatch(SET_FILTER({ reduxGenreList: returnGenreList, reduxDirectorList: returnDirectorList, reduxYearList: returnYearList, reduxRatingList: returnRatingList }))
        setFilter(false);
    }

    React.useEffect(() => {
        // Apply filter is disabled if the given filter is already set.
        if (arrayEquals(returnGenreList, genre) && arrayEquals(returnDirectorList, director) && arrayEquals(returnYearList, year) && arrayEquals(returnRatingList, rating)) {
            setApplyDisabled(true);
        }
        else {
            setApplyDisabled(false);
        }
    }, [returnGenreList, returnDirectorList, returnYearList, returnRatingList, genre, year, director, rating]);

    React.useEffect(() => {
        //When component mounts set filter options
        const fetchData = async () => {
            const genres = await get("http://it2810-65.idi.ntnu.no:3000/allgenres")
            const directors = await get("http://it2810-65.idi.ntnu.no:3000/alldirectors")
            const years = await get("http://it2810-65.idi.ntnu.no:3000/allyears")
            const rating = await get("http://it2810-65.idi.ntnu.no:3000/allratings")
            setGenreList(genres)
            setDirectorList(directors)
            setYearList(years)
            setRatingList(rating)
        };
        fetchData();
    }, []);

    //Styling for filter
    const styles = StyleSheet.create({
        top: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "8%"
        },
        buttonStyle: {
            width: "45%",
            backgroundColor: buttonColor
        },
        checkBox: {
            marginLeft: "3%",
        },
        checkBoxText: {
            marginLeft: "5%",
        }
    });

    return (
        <View
            /*Buttons in  main page for adding filter or switching theme*/>
            <View style={{ backgroundColor: primaryColor, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '2%' }}>
                <Button style={styles.buttonStyle} mode="contained" onPress={() => handleClick()}>
                    Theme: {toggle}
                </Button>
                <Button style={styles.buttonStyle} mode="contained" onPress={() => setFilter(true)}>
                    Filter
                </Button>
            </View>
            {filter && <Modal animationType="slide" supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}><ScrollView style={{ backgroundColor: primaryColor }}>
                <View style={styles.top}>
                    <Title style={{ color: textColor, marginLeft: "5%" }}>Filter on</Title>
                    <Button style={{ marginRight: "2%", width: 1 }}
                        icon="window-close" mode="text"
                        onPress={() => setFilter(false)}
                        color={buttonColor}
                    >
                    </Button >
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.checkBoxText}>
                        <Paragraph style={{ color: textColor, marginTop: "5%", marginBottom: "12%" }}>Genre Filter: </Paragraph>
                        <Paragraph style={{ color: textColor, marginBottom: "12%" }}>Director Filter: </Paragraph>
                        <Paragraph style={{ color: textColor, marginBottom: "10%" }}>Year Filter: </Paragraph>
                        <Paragraph style={{ color: textColor }}>Rating Filter: </Paragraph>
                    </View>
                    <View style={styles.checkBox}>
                        <Checkbox color={buttonColor} uncheckedColor={buttonColor} status={filterGenre ? 'checked' : 'unchecked'} onPress={() => filterState(!filterGenre, setFilterGenre, setReturnGenreList)} />
                        <Checkbox color={buttonColor} uncheckedColor={buttonColor} status={filterDirector ? 'checked' : 'unchecked'} onPress={() => filterState(!filterDirector, setFilterDirector, setReturnDirectorList)} />
                        <Checkbox color={buttonColor} uncheckedColor={buttonColor} status={filterYear ? 'checked' : 'unchecked'} onPress={() => filterState(!filterYear, setFilterYear, setReturnYearList)} />
                        <Checkbox color={buttonColor} uncheckedColor={buttonColor} status={filterRating ? 'checked' : 'unchecked'} onPress={() => filterState(!filterRating, setFilterRating, setReturnRatingList)} />
                    </View>
                </View>
                {filterGenre &&
                    <FilterSelect
                        setReturnList={setReturnGenreList}
                        displayList={genreList}
                        returnList={returnGenreList}
                        filterOn="genre"
                    />
                }
                {filterDirector && <FilterSelect
                    setReturnList={setReturnDirectorList}
                    displayList={directorList}
                    returnList={returnDirectorList}
                    filterOn="director"
                />
                }
                {filterYear && <FilterSelect
                    setReturnList={setReturnYearList}
                    displayList={yearList}
                    returnList={returnYearList}
                    filterOn="year"
                />
                }
                {filterRating && <FilterSelect
                    setReturnList={setReturnRatingList}
                    displayList={ratingList}
                    returnList={returnRatingList}
                    filterOn="rating"
                />}
                <Button style={{ width: "90%", marginBottom: "5%", marginHorizontal: "5%", backgroundColor: buttonColor }} mode="contained" disabled={applyDisabled} onPress={() => applyFilter()}>
                    Apply filter
                </Button>
            </ScrollView >
            </Modal >}
        </View >
    );
}
