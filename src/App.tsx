import AddTodo from "@/components/AddTodo/AddTodo";
import ToDoList from "@/components/ToDoList/ToDoList";
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
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("https://easydev.club/api/v1/todos");
      const resData: MetaResponse<Todo, TodoInfo> = await response.json();
      resData.data.map((todo) => {
        todo.isEditing = false;
      });
      setToDos(resData.data);
    }
    fetchTodos();
  }, []);

  async function handleAddtodo(todoTitle: string | undefined) {
    const todo: TodoRequest = {};
    todoTitle = todoTitle?.trim();

    if (!todoTitle) {
      setErrorText("Это поле не может быть пустым");
      return;
    }

    switch (true) {
      case todoTitle?.length < 2:
        return setErrorText("Минимальная длина текста 2 символа");
      case todoTitle?.length > 64:
        return setErrorText("Максимальная длина текста 64 символа");
      case todoTitle?.length < 65 && todoTitle?.length > 1:
        setErrorText("");
    }

    todo.title = todoTitle;
    const response = await fetch(`https://easydev.club/api/v1/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
    });
    const resData: Todo = await response.json();

    if (response.ok && resData) {
      setToDos((prev) => [...prev, resData]);
    }
    console.log(resData);
  }

  async function deleteTodo(id: number) {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
    setToDos((prev) => prev.filter((todo) => todo.id !== id));
    console.log(response);
  }

  async function changeTodoStatus(id: number, currentStatus: boolean) {
    const todo: TodoRequest = {};
    todo.isDone = !currentStatus;

    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });
    const resData: Todo = await response.json();

    setToDos((prev) => prev.map((todo) => (todo.id === id ? resData : todo)));
    console.log(response);
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

  async function saveTodo(id: number, todoTitle: string) {
    const todo: TodoRequest = {};
    todo.title = todoTitle;

    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });

    const resData: Todo = await response.json();
    if (response.ok && resData) {
      cancelEdit(id);
    }
  }

  return (
    <>
      <div className="layout">
        <AddTodo handleAddtodo={handleAddtodo} errorText={errorText} />
        <ToDoList
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          editToDo={editToDo}
          saveTodo={saveTodo}
          cancelEdit={cancelEdit}
          toDos={toDos}
        />
      </div>
    </>
  );
}

export default App;
