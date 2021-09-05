export interface Todo {
	id: string;
	desc: string;
	isComplete: boolean;
}

export interface State {
	todos: Todo[];
	selectedTodo: string | null;
	counter: number;
}

export interface TodoApi {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}
