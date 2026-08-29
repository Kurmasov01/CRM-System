import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/TodoList/TodoList";
import TodoFilter from "@/components/TodoFilter/TodoFilter";
import { getTodos } from "@/api/FetchApi";
import { useState } from "react";
import type { Todo, TodoInfo, TodoActiveFilter } from "@/models/Models";
import { useEffect } from "react";
import Title from "antd/es/typography/Title";

const GET_TODOS_INTERVAL: number = 5000;

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInfo, setTodoInfo] = useState<TodoInfo>();
  const [activeFilter, setActiveFilter] = useState<TodoActiveFilter>("all");
  const [pauseTimer, setPauseTimer] = useState<boolean>(false);

  useEffect(() => {
    onGetTodos();
  }, []);

  useEffect(() => {
    if (pauseTimer) return;
    const timerId = setInterval(onGetTodos, GET_TODOS_INTERVAL, activeFilter);

    return () => {
      clearInterval(timerId);
    };
  }, [activeFilter, pauseTimer]);

  async function onGetTodos(filter?: TodoActiveFilter) {
    let queryFilter = filter ?? activeFilter;
    try {
      const resData = await getTodos(queryFilter);
      setTodos(resData.data);
      setTodoInfo(resData.meta.statusCounts);
    } catch (error) {
      alert("Не удалось загрузить задачи, ошибка: " + error);
    }
  }

  return (
    <>
      <Title level={1}>Мои задачи</Title>
      <AddTodo updateTodos={onGetTodos} />
      <TodoFilter
        setActiveFilter={setActiveFilter}
        updateTodos={onGetTodos}
        todoInfo={todoInfo}
      />
      <TodoList
        updateTodos={onGetTodos}
        todos={todos}
        setPauseTimer={setPauseTimer}
      />
    </>
  );
}

export default TodoPage;
