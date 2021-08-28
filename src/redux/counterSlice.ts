import { createSlice } from '@reduxjs/toolkit';
import {
	createTodoAction,
	editTodoAction,
	removeTodoAction,
	toggleTodoAction
} from './todoSlice';

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {},
	extraReducers: {
		[createTodoAction.type]: (state) => state + 1,
		[editTodoAction.type]: (state) => state + 1,
		[toggleTodoAction.type]: (state) => state + 1,
		[removeTodoAction.type]: (state) => state + 1
	}
});

export default counterSlice.reducer;
