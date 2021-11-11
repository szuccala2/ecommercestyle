import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchFilterState {
  searchFilter: string
};

const initialState: SearchFilterState = {
    searchFilter: ""
};

export const searchSlice = createSlice({
  name: 'SET_SEARCH_FILTER',
  initialState,
  reducers: {
    setSearchFilter: (state: SearchFilterState, action: PayloadAction<string>) => {
        state.searchFilter = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSearchFilter } = searchSlice.actions;
export default searchSlice.reducer;