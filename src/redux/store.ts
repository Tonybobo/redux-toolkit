import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import todoReducer from './todoSlice';
import counterReducer from './counterSlice';
import selectedSliceReducer from './selectedSlice';
// ...
const store = configureStore({
	reducer: {
		todos: todoReducer,
		counter: counterReducer,
		selected: selectedSliceReducer
	},
	middleware: new MiddlewareArray().concat(logger)
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
