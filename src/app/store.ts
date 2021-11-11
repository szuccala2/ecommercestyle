import { configureStore } from '@reduxjs/toolkit';
import searchFilterReducer from './features/searchSlice';
import selectedFilterReducer from './features/selectedSlice';

export const store = configureStore({
  reducer: {
      searchFilter : searchFilterReducer,
      selectedFilter : selectedFilterReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;