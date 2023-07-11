import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Create the Redux store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
