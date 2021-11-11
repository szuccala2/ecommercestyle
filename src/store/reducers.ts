import { Action } from './actions';
import { stateModel } from '../model/models';

const reducer = (state: stateModel = { stockFilter: "none", searchFilter: "" }, action: Action) => {
    switch(action.type) {
        case 'SET_STOCK_FILTER':
            return {
                ...state,
                stockFilter: action.stockFilter
            };
        case 'SET_SEARCH_FILTER':
            return {
                ...state,
                searchFilter: action.searchFilter
            };
        default:
            return state;
    }
}

export default reducer;