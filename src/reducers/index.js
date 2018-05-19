import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import promotionReducer from './promotion';
import businessReducer from './business';

const rootReducer = combineReducers({
  routing: routerReducer,
  promotions: promotionReducer,
  businesses: businessReducer
});

export default rootReducer;
