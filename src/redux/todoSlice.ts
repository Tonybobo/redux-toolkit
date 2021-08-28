import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { v4 as uuid } from 'uuid';

import { Todo } from '../type';

const todos: Todo[] = [
	{
		id: uuid(),
		desc: 'Learn React',
		isComplete: true
	},
	{
		id: uuid(),
		desc: 'Learn Redux',
		isComplete: true
	},
	{
		id: uuid(),
		desc: 'Learn Redux-ToolKit',
		isComplete: false
	}
];

const todoSlice = createSlice({
	name: 'todos',
	initialState: todos,
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
	}
});

export const {
	create: createTodoAction,
	edit: editTodoAction,
	toggle: toggleTodoAction,
	remove: removeTodoAction
} = todoSlice.actions;

export default todoSlice.reducer;
