import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

//define interface used by reducer
interface loginState {
    userLoggedIn: string
};

//Set login intial state
const initialState: loginState = {
    userLoggedIn: ''
};

export const loginSlice = createSlice({
    //Use createSlice to make a combined reducer, used here so all reducers have common setup
    //Set name, intial state and define reducers
    name: 'login',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action: PayloadAction<string>) => {
            //Based on the payload, set the logged in user
            state.userLoggedIn = action.payload;
        },
    }
});
//Export relevant functions, setUserLoggedIn to dispatch actions, select** to get value from store
export const { setUserLoggedIn } = loginSlice.actions;
export const selectUser = (state: RootState) => state.login.userLoggedIn

//Export reducer to use in store
export default loginSlice.reducer;