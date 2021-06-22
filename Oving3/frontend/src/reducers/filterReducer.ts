import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

//define interface used by reducer
interface filterState {
    reduxGenreList: string[];
    reduxDirectorList: string[];
    reduxYearList: string[];
    reduxRatingList: string[];
};

//Set filter intial state
const initialState: filterState = {
    reduxGenreList: [],
    reduxDirectorList: [],
    reduxYearList: [],
    reduxRatingList: []
};

export const filterSlice = createSlice({
    //Use createSlice to make a combined reducer, used here so all reducers have common setup
    //Set name, intial state and define reducers
    name: 'filter',
    initialState,
    reducers: {
        setReduxFilter: (state, action: PayloadAction<filterState>) => {
            //Based on the payload, set the filter(s)
            state.reduxGenreList = action.payload.reduxGenreList;
            state.reduxDirectorList = action.payload.reduxDirectorList;
            state.reduxYearList = action.payload.reduxYearList;
            state.reduxRatingList = action.payload.reduxRatingList;
        },
    }
});

//Export relevant functions, setReduxFilter to dispatch actions, select** to get value from store
export const { setReduxFilter } = filterSlice.actions;
export const selectGenre = (state: RootState) => state.filter.reduxGenreList
export const selectDirector = (state: RootState) => state.filter.reduxDirectorList
export const selectYear = (state: RootState) => state.filter.reduxYearList
export const selectRating = (state: RootState) => state.filter.reduxRatingList

//Export reducer to use in store
export default filterSlice.reducer;