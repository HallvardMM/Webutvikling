import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { get } from '../../fetch';
import { setReduxFilter, selectDirector, selectGenre, selectYear, selectRating } from '../../reducers/filterReducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavbarText, selectFilter, selectButton, selectCheckbox, selectAutoDropDown, setTheme } from '../../reducers/themeReducer';
import ListboxComponent from '../navbar/ListBoxComponent';
import { renderGroup } from '../navbar/VirtualizedSearchComponent';

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
    //Styling colors imported from redux
    const filterColor = useSelector(selectFilter);
    const navbarText = useSelector(selectNavbarText);
    const autoDropDown = useSelector(selectAutoDropDown);
    const buttonColor = useSelector(selectButton);
    const checkbox = useSelector(selectCheckbox);

    const useStyles = makeStyles((theme: Theme) =>
        //Define styling
        createStyles({
            root: {
                '& > * + *': {
                    marginTop: 0,
                },
            },
            filterRoot: {
                background: filterColor,
                color: navbarText,
                paddingTop: 5,
                paddingLeft: 10,
                paddingBottom: 10,
                justifyContent: 'space-around',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: 'auto',
            },
            autoComplete: {
                paddingLeft: 4,
                paddingRight: 2,
                background: filterColor,
                "& .MuiFormLabel-root": {
                    color: navbarText,
                },
                "& .MuiInput-underline:before": {
                    borderBottomColor: navbarText,
                },
                "& .MuiInput-underline:after": {
                    borderBottomColor: navbarText,
                },
                "& .MuiInputBase-root": {
                    color: navbarText,
                },
                "& .MuiIconButton-root": {
                    color: navbarText,
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: navbarText
                }
            },
            paper: {
                color: navbarText,
                background: autoDropDown,
            },
            button: {
                background: buttonColor,
                color: navbarText,
            },
            checkbox: {
                color: checkbox,
                '& .MuiCheckbox-colorSecondary.Mui-checked': {
                    color: checkbox
                }
            }
        }),
    );


    const classes = useStyles(); // classes = styling

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
    const director = useSelector(selectDirector);
    const rating = useSelector(selectRating);
    const genre = useSelector(selectGenre);
    const year = useSelector(selectYear);
    const dispatch = useDispatch();
    const [toggle, setToggle] = React.useState("standard");

    const handleClick = () => {
        if (toggle === "warm") {
            dispatch(setTheme("standard"))
            setToggle("standard")
        }
        else if (toggle === "standard") {
            dispatch(setTheme("dark"))
            setToggle("dark")
        }
        else {
            dispatch(setTheme("warm"))
            setToggle("warm")
        }
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
            const genres = await get("http://localhost:5000/allgenres")
            const directors = await get("http://localhost:5000/alldirectors")
            const years = await get("http://localhost:5000/allyears")
            const rating = await get("http://localhost:5000/allratings")
            setGenreList(genres)
            setDirectorList(directors)
            setYearList(years)
            setRatingList(rating)
        };
        fetchData();
    }, []);


    return (
        <div className={classes.root}>
            <FormGroup classes={{ root: classes.filterRoot }} row
            /*Form Group contains all the checkboxes for filters and apply filter button */>
                <FormControlLabel
                    classes={{ root: classes.checkbox }}
                    control={<Checkbox className={classes.checkbox} checked={filterGenre} onChange={() => filterState(!filterGenre, setFilterGenre, setReturnGenreList)} name="checkedGenre" />}
                    label="Genre Filter"
                />
                <FormControlLabel
                    classes={{ root: classes.checkbox }}
                    control={<Checkbox className={classes.checkbox} checked={filterDirector} onChange={() => filterState(!filterDirector, setFilterDirector, setReturnDirectorList)} name="checkedDirector" />}
                    label="Director Filter"

                />
                <FormControlLabel
                    classes={{ root: classes.checkbox }}
                    control={<Checkbox className={classes.checkbox} checked={filterYear} onChange={() => filterState(!filterYear, setFilterYear, setReturnYearList)} name="checkedYear" />}
                    label="Year Filter"
                />
                <FormControlLabel
                    classes={{ root: classes.checkbox }}
                    control={<Checkbox className={classes.checkbox} checked={filterRating} onChange={() => filterState(!filterRating, setFilterRating, setReturnRatingList)} name="checkedRating" />}
                    label="Rating Filter"

                />
                {applyDisabled ? <Button variant="contained" disabled={applyDisabled} onClick={() => dispatch(setReduxFilter({ reduxGenreList: returnGenreList, reduxDirectorList: returnDirectorList, reduxYearList: returnYearList, reduxRatingList: returnRatingList }))}>
                    Apply filter
                    </Button> : <Button variant="contained" className={classes.button} disabled={applyDisabled} onClick={() => dispatch(setReduxFilter({ reduxGenreList: returnGenreList, reduxDirectorList: returnDirectorList, reduxYearList: returnYearList, reduxRatingList: returnRatingList }))}>
                        Apply filter
                    </Button>}
                <Button variant="contained" className={classes.button} onClick={() => handleClick()}>
                    Theme: {toggle}
                </Button>
            </FormGroup>

            {filterGenre &&
                <Autocomplete /* Autocomplete for genre*/
                    multiple
                    fullWidth
                    id="filterGenre"
                    options={genreList}
                    classes={{ root: classes.autoComplete, paper: classes.paper, tag: classes.button }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label=" Filter genre"
                            placeholder="Genre"
                        />
                    )}
                    onChange={(event, value, reason) => setReturnGenreList(value)}
                />}
            {filterDirector &&
                <Autocomplete /* Autocomplete for director*/
                    multiple
                    id="filterDirector"
                    options={directorList}
                    classes={{ root: classes.autoComplete, paper: classes.paper, tag: classes.button }}
                    /* virtualize the director listbox due to it having 2000 elements */
                    ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                    renderGroup={renderGroup}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Filter director"
                            placeholder="Director"
                        />
                    )}
                    onChange={(event, value, reason) => setReturnDirectorList(value)}
                />}
            {filterYear &&
                <Autocomplete /* Autocomplete for year*/
                    multiple
                    id="filterYear"
                    options={yearList}
                    classes={{ root: classes.autoComplete, paper: classes.paper, tag: classes.button }}
                    getOptionLabel={(option) => option.toString()}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Filter year"
                            placeholder="Year"
                        />
                    )}
                    onChange={(event, value, reason) => setReturnYearList(value)
                    }
                />
            }{filterRating && <Autocomplete /* Autocomplete for rating*/
                multiple
                id="filterRating"
                options={ratingList}
                classes={{ root: classes.autoComplete, paper: classes.paper, tag: classes.button }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Filter rating"
                        placeholder="Rating"
                    />
                )}
                onChange={(event, value, reason) => setReturnRatingList(value)}
            />}
        </div>
    );
}