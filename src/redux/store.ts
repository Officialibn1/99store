import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-reducer";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import favouriteReducer from "./favourite-reducer";

const persistConfig = {
	key: "root",
	storage,
};

const cartConfig = {
	key: "cart",
	storage,
};

const favouriteConfig = {
	key: "favourite",
	storage,
};

const rootReducer = combineReducers({
	favourite: persistReducer(favouriteConfig, favouriteReducer),
	cart: persistReducer(cartConfig, cartReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
