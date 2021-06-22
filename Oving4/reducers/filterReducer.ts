import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

//Combining sort, search and filter in one reducer as they all affect data representation
//And is used in table


//define interface used by reducer
interface reduxState {
  reduxGenreList: string[];
  reduxDirectorList: string[];
  reduxYearList: string[];
  reduxRatingList: string[];
  reduxSort: string;
  reduxSearch: string;
};

//Interface for filters, so that sort doesnt have to be sent as well
interface filterState {
  reduxGenreList: string[];
  reduxDirectorList: string[];
  reduxYearList: string[];
  reduxRatingList: string[];
};

//Interface for sort, so that filters doesnt have to be sent as well
interface sortState {
  reduxSort: string;
}

//Interface for search, so that filters doesnt have to be sent as well
interface searchState {
  searchText: string
};

//Set intialstate, combination of filter and sort
const initialState: reduxState = {
  reduxGenreList: [],
  reduxDirectorList: [],
  reduxYearList: [],
  reduxRatingList: [],
  reduxSort: "name",
  reduxSearch: "",
};

export const filterSlice = createSlice({
  //Use createSlice to make a combined reducer, used here so all reducers have common setup
  //Set name, intial state and define reducers
  name: "filter",
  initialState,
  reducers: {
    SET_FILTER: (state, action: PayloadAction<filterState>) => {
      //Based on the payload, set the filters
      state.reduxGenreList = action.payload.reduxGenreList;
      state.reduxDirectorList = action.payload.reduxDirectorList;
      state.reduxYearList = action.payload.reduxYearList;
      state.reduxRatingList = action.payload.reduxRatingList;
    },
    SET_SORT: (state, action: PayloadAction<sortState>) => {
      //based on payload, set sort/OrderBy
      state.reduxSort = action.payload.reduxSort;
    },
    SET_SEARCH: (state, action: PayloadAction<searchState>) => {
      //Based on the payload, set the state searchtext
      state.reduxSearch = action.payload.searchText;
    }
  },
});

//Export relevant functions, SET_FILTER, SET_SORT to dispatch actions, GET_** to get value from store
export const { SET_FILTER, SET_SORT, SET_SEARCH } = filterSlice.actions;
export const GET_GENRE = (state: RootState) => state.filter.reduxGenreList
export const GET_DIRECTOR = (state: RootState) => state.filter.reduxDirectorList
export const GET_YEAR = (state: RootState) => state.filter.reduxYearList
export const GET_RATING = (state: RootState) => state.filter.reduxRatingList
export const GET_SORT = (state: RootState) => state.filter.reduxSort
export const GET_SEARCH = (state: RootState) => state.filter.reduxSearch;

//Export reducer to use in store
export default filterSlice.reducer;