import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stockFilter, stateModel } from '../model/models';

const initialState: stateModel = {
    searchFilter: "",
    selectedFilter: "none"
};

export const filterSlice = createSlice({
  name: 'SET_STATE',
  initialState,
  reducers: {
    setSelectedFilter: (state: stateModel, action: PayloadAction<stockFilter>) => {
      state.selectedFilter = action.payload;
    },
    setSearchFilter: (state: stateModel, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const filterSliceActions = filterSlice.actions;
export default filterSlice.reducer;