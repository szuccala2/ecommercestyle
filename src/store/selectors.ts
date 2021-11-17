import { RootState } from './store';

export const selectedFilterSelector = (state: RootState) => state.filterSlice.selectedFilter;
export const searchFilterSelector = (state: RootState) => state.filterSlice.searchFilter;