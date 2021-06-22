import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

//define interface used by reducer
interface searchState {
    searchText: string
};

//Set search intial state
const initialState: searchState = {
    searchText: ''
};

export const searchSlice = createSlice({
    //Use createSlice to make a combined reducer, used here so all reducers have common setup
    //Set name, intial state and define reducers
    name: 'search',
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            //Based on the payload, set the state searchtext
            state.searchText = action.payload;
        },
    }
});

//Export relevant functions, setSearchText to dispatch actions, select** to get value from store
export const { setSearchText } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search.searchText;

//Export reducer to use in store
export default searchSlice.reducer;