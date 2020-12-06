import { createStore, applyMiddleware, compose } from "redux";
// Redux Persist stuff
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import thunk from "redux-thunk";
import rootReducer from "./reducers";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleware = [thunk];

const store = createStore(
	persistedReducer, // pass the persisted reducer instead of rootReducer
	initialState,
	compose(
		applyMiddleware(...middleware),
		//REMOVE THIS LINE FOR PRODUCTION
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

const persistor = persistStore(store);
export { store, persistor };
