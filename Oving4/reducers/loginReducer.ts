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
        SET_USER: (state, action: PayloadAction<string>) => {
            //Based on the payload, set the logged in user
            state.userLoggedIn = action.payload;
        },
    }
});
//Export relevant functions, SET_USER to dispatch actions, GET_** to get value from store
export const { SET_USER } = loginSlice.actions;
export const GET_USER = (state: RootState) => state.login.userLoggedIn

//Export reducer to use in store
export default loginSlice.reducer;