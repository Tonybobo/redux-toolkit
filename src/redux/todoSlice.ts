import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { v4 as uuid } from 'uuid';

import { Todo, TodoApi } from './../type.d';

export const fetchTodos = createAsyncThunk('users/1/todos', async () => {
	const response: Todo[] = await axios
		.get('https://jsonplaceholder.typicode.com/users/1/todos')
		.then((res) => {
			return res.data.map((arr: TodoApi) => ({
				id: uuid(),
				desc: arr.title,
				isCompleted: arr.completed
			}));
		})
		.catch((err) => console.log(err));

	return response;
});

const todoSlice = createSlice({
	name: 'todos',
	initialState: [] as Todo[],
	reducers: {
		create: {
			reducer: (
				state,
				{
					payload
				}: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
			) => {
				state.push(payload);
			},
			prepare: ({ desc }: { desc: string }) => ({
				payload: {
					id: uuid(),
					desc,
					isComplete: false
				}
			})
		},
		edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
			const index = state.findIndex((todo) => todo.id === payload.id);
			if (index !== -1) {
				state[index].desc = payload.desc;
			}
		},
		toggle: (state, { payload }: PayloadAction<{ id: string }>) => {
			const index = state.findIndex((todo) => todo.id === payload.id);
			if (index !== -1) {
				state[index].isComplete = !state[index].isComplete;
			}
		},
		remove: (state, { payload }: PayloadAction<{ id: string }>) => {
			const index = state.findIndex((todo) => todo.id === payload.id);
			if (index !== -1) {
				state.splice(index, 1);
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
			payload.forEach((todo) => {
				state.push(todo);
			});
		});
	}
});

export const {
	create: createTodoAction,
	edit: editTodoAction,
	toggle: toggleTodoAction,
	remove: removeTodoAction
} = todoSlice.actions;

export default todoSlice.reducer;
