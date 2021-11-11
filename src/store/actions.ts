import { stockFilter } from '../model/models';

type SetStockFilterAction = { type: 'SET_STOCK_FILTER', stockFilter: stockFilter};
export const setStockFilter = (stockFilter: stockFilter): SetStockFilterAction => ({
  type: 'SET_STOCK_FILTER',
  stockFilter
});

type SetSearchFilterAction = { type: 'SET_SEARCH_FILTER', searchFilter: string };
export const setSearchFilter = (searchFilter: string): SetSearchFilterAction => ({
  type: 'SET_SEARCH_FILTER',
  searchFilter
});

export type Action = SetSearchFilterAction | SetStockFilterAction;