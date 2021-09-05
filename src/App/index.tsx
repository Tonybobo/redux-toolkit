import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState
} from 'react';

import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
	createTodoAction,
	editTodoAction,
	removeTodoAction,
	toggleTodoAction
} from '../redux/todoSlice';
import { selectTodoActionCreator } from '../redux/selectedSlice';
import { fetchTodos } from './../redux/todoSlice';

const App = function() {
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.todos);
	const selectedTodoId = useSelector((state: RootState) => state.selected);
	const editedCount = useSelector((state: RootState) => state.counter);

	const [newTodoInput, setNewTodoInput] = useState<string>('');
	const [editTodoInput, setEditTodoInput] = useState<string>('');
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const editInput = useRef<HTMLInputElement>(null);

	const selectedTodo =
		(selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
		null;

	const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setNewTodoInput(e.target.value);
	};

	const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setEditTodoInput(e.target.value);
	};

	const handleCreateNewTodo = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!newTodoInput.length) return;

		dispatch(createTodoAction({ desc: newTodoInput }));
		setNewTodoInput('');
	};

	const handleSelectTodo = (todoId: string) => (): void => {
		dispatch(selectTodoActionCreator({ id: todoId }));
	};

	const handleEdit = (): void => {
		if (!selectedTodo) return;

		setEditTodoInput(selectedTodo.desc);
		setIsEditMode(true);
	};

	useEffect(() => {
		dispatch(fetchTodos());
		if (isEditMode) {
			editInput?.current?.focus();
		}
	}, [isEditMode, dispatch]);

	const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!editTodoInput.length || !selectedTodoId) {
			handleCancelUpdate();
		}
		dispatch(
			editTodoAction({ id: selectedTodoId as string, desc: editTodoInput })
		);
		setIsEditMode(false);
		setEditTodoInput('');
	};

	const handleCancelUpdate = (
		e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		e?.preventDefault();
		setIsEditMode(false);
		setEditTodoInput('');
	};

	const handleToggle = (): void => {
		if (!selectedTodoId || !selectedTodo) return;
		dispatch(toggleTodoAction({ id: selectedTodoId }));
	};

	const handleDelete = (): void => {
		if (!selectedTodoId) return;
		dispatch(removeTodoAction({ id: selectedTodoId }));
	};

	return (
		<div className="App">
			<div className="App__counter">Todos Updated Count: {editedCount}</div>
			<div className="App__header">
				<h1>Todo: Redux vs RTK Edition</h1>
				<form onSubmit={handleCreateNewTodo}>
					<label htmlFor="new-todo">Add new:</label>
					<input
						onChange={handleNewInputChange}
						id="new-todo"
						value={newTodoInput}
					/>
					<button type="submit">Create</button>
				</form>
			</div>
			<div className="App__body">
				<ul className="App__list">
					<h2>My Todos:</h2>
					{todos.length ? (
						todos.map((todo, i) => (
							<li
								className={`${todo.isComplete ? 'done' : ''} ${
									todo.id === selectedTodoId ? 'active' : ''
								}`}
								key={todo.id}
								onClick={handleSelectTodo(todo.id)}>
								<span className="list-number">{i + 1})</span> {todo.desc}
							</li>
						))
					) : (
						<p>There is no todos</p>
					)}
				</ul>
				<div className="App_todo-info">
					<h2>Selected Todo:</h2>
					{selectedTodo === null ? (
						<span className="empty-state">No Todo Selected</span>
					) : !isEditMode ? (
						<>
							<span
								className={`todo-desc ${
									selectedTodo?.isComplete ? 'done' : ''
								}`}>
								{selectedTodo.desc}
							</span>
							<div className="todo-actions">
								<button onClick={handleEdit}>Edit</button>
								<button onClick={handleToggle}>Toggle</button>
								<button onClick={handleDelete}>Delete</button>
							</div>
						</>
					) : (
						<form onSubmit={handleUpdate}>
							<label htmlFor="edit-todo">Edit:</label>
							<input
								ref={editInput}
								onChange={handleEditInputChange}
								value={editTodoInput}
							/>
							<button type="submit">Update</button>
							<button onClick={handleCancelUpdate}>Cancel</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
