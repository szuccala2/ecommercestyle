import { stateModel } from '../model/models'

export const selectSearchFilter = (state: stateModel) => state.searchFilter;

export const selectStockFilter = (state: stateModel) => state.stockFilter;