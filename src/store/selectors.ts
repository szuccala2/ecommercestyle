import { RootState } from './store';

export const selectedFilterSelector = (state: RootState) => state.productsSlice.selectedFilter;
export const searchFilterSelector = (state: RootState) => state.productsSlice.searchFilter;
export const productsSelector = (state: RootState) => state.productsSlice.products;