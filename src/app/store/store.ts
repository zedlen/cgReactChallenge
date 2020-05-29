import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import redditReducer  from './redditSlice';


export const store = configureStore({
  reducer: {
    reddit: redditReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
