import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

//Define theme interface used by reducer
export interface theme {
    primaryColor: string
    buttonColor: string
    textColor: string
    secondaryColor: string
}

//Define initial state of theme, blue
const initialState: theme = {
    primaryColor: '#4682B4',
    buttonColor: '#FF7F50',
    textColor: '#000000',
    secondaryColor: '#F0FFFF',
}


//Define other state of theme, dark
const dark: theme = {
    primaryColor: '#505060',
    buttonColor: '#E3C31F',
    textColor: '#FAFAFA',
    secondaryColor: '#808090',
}

//Define other state of theme, warm
const warm: theme = {
    primaryColor: '#FA663A',
    buttonColor: '#F8A23E',
    textColor: '#000000',
    secondaryColor: '#F0E68C',
}

export const themeSlice = createSlice({
    //Use createSlice to make a combined reducer, used here so all reducers have common setup
    //Set name, intial state and define reducers
    name: 'theme',
    initialState,
    reducers: {
        SET_THEME: (state, action: PayloadAction<string>) => {
            //Based on the payload, change the theme to the chosen theme
            if (action.payload === "blue") {
                state.primaryColor = initialState.primaryColor
                state.buttonColor = initialState.buttonColor
                state.textColor = initialState.textColor
                state.secondaryColor = initialState.secondaryColor
            }
            else if (action.payload === "dark") {
                state.primaryColor = dark.primaryColor
                state.buttonColor = dark.buttonColor
                state.textColor = dark.textColor
                state.secondaryColor = dark.secondaryColor
            }
            else {
                state.primaryColor = warm.primaryColor
                state.buttonColor = warm.buttonColor
                state.textColor = warm.textColor
                state.secondaryColor = warm.secondaryColor
            }
        }
    }
});

//Export relevant functions, SET_THEME to set actions, GET_** to get value from store
export const { SET_THEME } = themeSlice.actions;
export const GET_PRIMARY_COLOR = (state: RootState) => state.theme.primaryColor;
export const GET_BUTTON_COLOR = (state: RootState) => state.theme.buttonColor;
export const GET_TEXT_COLOR = (state: RootState) => state.theme.textColor;
export const GET_SECONDARY_COLOR = (state: RootState) => state.theme.secondaryColor;

//Export reducer to use in store
export default themeSlice.reducer;