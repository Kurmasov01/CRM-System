import AddTodo from "@/components/AddTodo/AddTodo";
import ToDoList from "@/components/ToDoList/ToDoList";
import TodoFilter from "@/components/TodoFilter/TodoFilter";
import { useState } from "react";
import type {
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
} from "@/models/Models";
import { useEffect } from "react";

function App() {
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [toDoInfo, setToDoInfo] = useState<TodoInfo>();
  const [errorText, setErrorText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(
        "https://easydev.club/api/v1/todos?filter=all",
      );
      const resData: MetaResponse<Todo, TodoInfo> = await response.json();
      resData.data.map((todo) => {
        todo.isEditing = false;
      });
      setToDos(resData.data);
      setToDoInfo(resData.info);
    }
    fetchTodos();
  }, []);

  function onFilterChange(filter: string) {
    setActiveFilter(filter);
    fetchTodosInfo(filter);
  }

  async function fetchTodosInfo(status: string) {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${status}`,
    );
    const resData: MetaResponse<Todo, TodoInfo> = await response.json();
    setToDos(resData.data);
    setToDoInfo(resData.info);
    console.log(resData.info);
  }

  async function handleAddtodo(todoTitle: string | undefined) {
    const todo: TodoRequest = {
      title: todoTitle!.trim(),
    };
    const response = await fetch(`https://easydev.club/api/v1/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
    });
    const resData: Todo = await response.json();

    if (response.ok && resData) {
      fetchTodosInfo(activeFilter);
    }
  }

  async function deleteTodo(id: number) {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodosInfo(activeFilter);
  }

  async function changeTodoStatus(id: number, currentStatus: boolean) {
    const todo: TodoRequest = {};
    todo.isDone = !currentStatus;

    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });

    fetchTodosInfo(activeFilter);
  }

  function editToDo(id: number) {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: true,
            }
          : todo,
      ),
    );
  }

  function cancelEdit(id: number) {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: false,
            }
          : todo,
      ),
    );
  }

  async function handleSaveTodo(id: number, todoTitle: string) {
    const error = validateTodoTitle(todoTitle);

    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");

    const todo: TodoRequest = {
      title: todoTitle,
    };

    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });

    const resData: Todo = await response.json();
    if (response.ok && resData) {
      cancelEdit(id);
      fetchTodosInfo(activeFilter);
    }
  }

  return (
    <>
      <div className="layout">
        <AddTodo handleAddtodo={handleAddtodo} errorText={errorText} />
        <TodoFilter
          onFilterChange={onFilterChange}
          activeFilter={activeFilter}
          fetchTodosInfo={fetchTodosInfo}
          toDoInfo={toDoInfo}
        />
        <ToDoList
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          editToDo={editToDo}
          handleSaveTodo={handleSaveTodo}
          cancelEdit={cancelEdit}
          toDos={toDos}
        />
      </div>
    </>
  );
}

export function validateTodoTitle(title: string | undefined): string {
  const value = title?.trim();

  if (!value) {
    return "Это поле не может быть пустым";
  }

  if (value.length < 2) {
    return "Минимальная длина текста 2 символа";
  }

  if (value.length > 64) {
    return "Максимальная длина текста 64 символа";
  }

  return "";
}

export default App;
