import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stockFilter } from '../../model/models';

export interface SelectedFilterState {
  selectedFilter: stockFilter
};

const initialState: SelectedFilterState = {
    selectedFilter: "none"
};

export const selectedSlice = createSlice({
  name: 'SET_SELECTED_FILTER',
  initialState,
  reducers: {
    setSelectedFilter: (state: SelectedFilterState, action: PayloadAction<stockFilter>) => {
        state.selectedFilter = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSelectedFilter } = selectedSlice.actions;
export default selectedSlice.reducer;