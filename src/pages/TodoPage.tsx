import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/TodoList/TodoList";
import TodoFilter from "@/components/TodoFilter/TodoFilter";
import { getTodos } from "@/api/FetchApi";
import { useState } from "react";
import type {
  Todo,
  TodoInfo,
  MetaResponse,
  TodoActiveFilter,
} from "@/models/Models";
import { useEffect } from "react";
import Title from "antd/es/typography/Title";

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInfo, setTodoInfo] = useState<TodoInfo>();
  const [activeFilter, setActiveFilter] = useState<TodoActiveFilter>("all");

  useEffect(() => {
    onGetTodos();
    const timerId = setInterval(onGetTodos, 5000, activeFilter);

    return () => {
      clearInterval(timerId);
    };
  }, [activeFilter]);

  async function onGetTodos(filter?: TodoActiveFilter) {
    let queryFilter: TodoActiveFilter = filter ? filter : activeFilter;
    try {
      const resData: MetaResponse<Todo, TodoInfo> = await getTodos(queryFilter);
      setTodos(resData.data);
      setTodoInfo(resData.info);
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
      <TodoList updateTodos={onGetTodos} todos={todos} />
    </>
  );
}

export default TodoPage;
