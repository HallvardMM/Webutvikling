import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

//Define theme interface used by reducer
export interface theme {
    navbar: string
    filter: string
    button: string
    tableHeader: string
    table: string
    navbarText: string
    tableText: string
    autoDropDown: string
    errorColor: string
    checkbox: string
}

//Define initial state of theme, standard
const initialState: theme = {
    navbar: 'linear-gradient(90deg, #31708E 30%, #7490B2 90%)',
    filter: 'linear-gradient(90deg, #31708E 30%, #7490B2 90%)',
    button: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    tableHeader: '#B4E0F4',
    table: 'linear-gradient(45deg, #F0F8FF 30%, #C8EDFA 90%)',
    navbarText: '#F7F9FB',
    tableText: '#000000',
    autoDropDown: 'linear-gradient(70deg, #5490B2 40%, #8FC1E3 90%)',
    errorColor: '#FF0000',
    checkbox: '#FE6B8B',
}

//Define other state of theme, dark
const dark: theme = {
    navbar: 'linear-gradient(90deg, #202025 10%, #505040 60%)',
    filter: 'linear-gradient(90deg, #202025 10%, #505040 60%)',
    button: 'linear-gradient(45deg, #FFD700 10%, #848460 90%)',
    tableHeader: '#404045',
    table: 'linear-gradient(45deg, #7A7A7A 30%, #606064 90%)',
    navbarText: '#FAFAFA',
    tableText: '#F5F5F5',
    autoDropDown: 'linear-gradient(90deg, #202025 10%, #505040 60%)',
    errorColor: '#FF0000',
    checkbox: '#FFD700',
}

//Define other state of theme, warm
const warm: theme = {
    navbar: 'linear-gradient(90deg, #F08080 10%, #F49785 60%)',
    filter: 'linear-gradient(90deg, #F08080 10%, #F49785 60%)',
    button: 'linear-gradient(45deg, #A480CF 30%, #D264B6 90%)',
    tableHeader: '#F6B49B',
    table: 'linear-gradient(90deg, #FFDAB9 10%, #FBC4AB 100%)',
    navbarText: '#F5F5F5',
    tableText: '#9A8C98',
    autoDropDown: 'linear-gradient(90deg, #F08080 10%, #F49785 60%)',
    errorColor: '#FF0000',
    checkbox: '#6247AA',
}

export const themeSlice = createSlice({
    //Use createSlice to make a combined reducer, used here so all reducers have common setup
    //Set name, intial state and define reducers
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            //Based on the payload, change the theme to the chosen theme
            if (action.payload === "standard") {
                state.navbar = initialState.navbar
                state.filter = initialState.filter
                state.button = initialState.button
                state.tableHeader = initialState.tableHeader
                state.table = initialState.table
                state.navbarText = initialState.navbarText
                state.tableText = initialState.tableText
                state.autoDropDown = initialState.autoDropDown
                state.errorColor = initialState.errorColor
                state.checkbox = initialState.checkbox
            }
            else if (action.payload === "dark") {
                state.navbar = dark.navbar
                state.filter = dark.filter
                state.button = dark.button
                state.tableHeader = dark.tableHeader
                state.table = dark.table
                state.navbarText = dark.navbarText
                state.tableText = dark.tableText
                state.autoDropDown = dark.autoDropDown
                state.errorColor = dark.errorColor
                state.checkbox = dark.checkbox
            }
            else {
                state.navbar = warm.navbar
                state.filter = warm.filter
                state.button = warm.button
                state.tableHeader = warm.tableHeader
                state.table = warm.table
                state.navbarText = warm.navbarText
                state.tableText = warm.tableText
                state.autoDropDown = warm.autoDropDown
                state.errorColor = warm.errorColor
                state.checkbox = warm.checkbox
            }
        }
    }
});

//Export relevant functions, setTheme to set actions, select** to get value from store
export const { setTheme } = themeSlice.actions;
export const selectNavbar = (state: RootState) => state.theme.navbar;
export const selectFilter = (state: RootState) => state.theme.filter;
export const selectButton = (state: RootState) => state.theme.button;
export const selectTable = (state: RootState) => state.theme.table;
export const selectTableHeader = (state: RootState) => state.theme.tableHeader;
export const selectTableText = (state: RootState) => state.theme.tableText;
export const selectErrorColor = (state: RootState) => state.theme.errorColor;
export const selectNavbarText = (state: RootState) => state.theme.navbarText;
export const selectAutoDropDown = (state: RootState) => state.theme.autoDropDown;
export const selectCheckbox = (state: RootState) => state.theme.checkbox;

//Export reducer to use in store
export default themeSlice.reducer;