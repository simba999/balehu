import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import promotionReducer from './promotion';

const rootReducer = combineReducers({
  routing: routerReducer,
  promotions: promotionReducer
});

export default rootReducer;
