import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
export interface TodoState {
  todos: Todo[];
  laoding: boolean;
  error: string | null;
}
const initialState: TodoState = {
  todos: [],
  laoding: false,
  error: null,
};

export const loadTodoFromServer = createAsyncThunk(
  "todo/loadTodoFromServer",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data as Todo[];
  },
);

const todoSclice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, actions: PayloadAction<Todo>) => {
      state.todos.push(actions.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodoFromServer.pending, (state) => {
      state.laoding = true;
      state.error = null;
    });
    builder.addCase(
      loadTodoFromServer.fulfilled,
      (state, actions: PayloadAction<Todo[]>) => {
        state.laoding = false;
        state.error = null;
        state.todos = actions.payload;
      },
    );
    builder.addCase(loadTodoFromServer.rejected, (state) => {
      state.laoding = false;
      state.error = "failed to load Todo";
      // state.todos = actions.payload;
    });
  },
});
export default todoSclice.reducer;
const { addTodo } = todoSclice.actions;
export { addTodo };
