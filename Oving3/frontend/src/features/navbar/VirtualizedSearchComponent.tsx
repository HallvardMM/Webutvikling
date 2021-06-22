import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { setSearchText } from '../../reducers/searchReducer';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../fetch';
import { selectNavbarText, selectAutoDropDown } from '../../reducers/themeReducer';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Typography } from '@material-ui/core';
import ListboxComponent from './ListBoxComponent';

export const renderGroup = (params: AutocompleteRenderGroupParams) => [
  //Define the rendergroup for the autocomplete component
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

export default function Virtualize() {
  //Get colors from redux
  const navbarText = useSelector(selectNavbarText);
  const autoDropDown = useSelector(selectAutoDropDown);

  const useStyles = makeStyles(() =>
    createStyles({
      //Define styles with color from redux, and overrides on outlines
      root: {
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
      }
    })
  );

  //Set necessary states and define dispatch-function for sending actions
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [films, setFilms] = useState<string[]>([]);
  const classes = useStyles();

  useEffect(() => {
    //Fetch the titles of the movies, used by the autocomplete component to display options
    const fetchTitles = async () => {
      const titles = await get("http://localhost:5000/alltitles")
      setFilms(titles)
    };
    fetchTitles();
  }, []);

  useEffect(() => {
    //Sets searchtext in redux whenever search updates (on enter or null)
    dispatch(setSearchText(search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Autocomplete
      //Virtualized autocompletecomponent from material ui
      id="autocomplete"
      style={{ width: 300 }}
      freeSolo
      disableListWrap
      //Classes used to override styling
      classes={classes}
      //Listbox and rendergroup used for virtualizing, size of rendered components
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      renderGroup={renderGroup}
      options={films}
      onChange={(event, value) => value != null ? setSearch(value) : setSearch('')}
      renderInput={(params) => <TextField {...params} label="Search in titles" />}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
    />
  );
}