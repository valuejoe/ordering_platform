import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducer/dataReducer";
import UIReducer from "./reducer/UIReducer";
import authReducer from "./reducer/authReducer";
const rootReducer = combineReducers({
    data: dataReducer,
    UI: UIReducer,
    auth: authReducer
});

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
