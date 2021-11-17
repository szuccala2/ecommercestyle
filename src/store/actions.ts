import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stockFilter, stateModel, ProductType } from '../model/models';

const initialState: stateModel = {
    searchFilter: "",
    selectedFilter: "none",
    products: []
};

export const productsSlice = createSlice({
  name: 'SET_STATE',
  initialState,
  reducers: {
    setSelectedFilter: (state: stateModel, action: PayloadAction<stockFilter>) => {
      state.selectedFilter = action.payload;
    },
    setSearchFilter: (state: stateModel, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setProducts: (state: stateModel, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const productsActions = productsSlice.actions;
export default productsSlice.reducer;