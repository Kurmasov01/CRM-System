import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/TodoList/TodoList";
import TodoFilter from "@/components/TodoFilter/TodoFilter";
import { getTodos } from "@/api/FetchApi";
import { useState } from "react";
import type { Todo, TodoInfo, MetaResponse } from "@/models/Models";
import { useEffect } from "react";

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInfo, setTodoInfo] = useState<TodoInfo>();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    onGetTodos();
  }, []);

  async function onGetTodos(filter?: string) {
    let queryFilter: string = filter ? filter : activeFilter;
    try {
      const resData: MetaResponse<Todo, TodoInfo> = await getTodos(queryFilter);
      setTodos(resData.data);
      setTodoInfo(resData.info);
    } catch (error) {
      alert("Не удалось загрузить задачи, ошибка: " + error);
    }
  }

  return (
    <section className="layout">
      <h1>Мои задачи</h1>
      <AddTodo updateTodos={onGetTodos} />
      <TodoFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        updateTodos={onGetTodos}
        todoInfo={todoInfo}
      />
      <TodoList updateTodos={onGetTodos} todos={todos} />
    </section>
  );
}

export default TodoPage;
