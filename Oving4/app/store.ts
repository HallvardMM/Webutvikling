import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import filterReducer from '../reducers/filterReducer';
import themeReducer from '../reducers/themeReducer';

const store = configureStore({
  //Setup store, link states to reducers
  reducer: {
    login: loginReducer,
    filter: filterReducer,
    theme: themeReducer
  },
});

//Export store, state and actions
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
