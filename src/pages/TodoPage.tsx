import AddTodo from "@/components/AddTodo/AddTodo";
import ToDoList from "@/components/ToDoList/ToDoList";
import TodoFilter from "@/components/TodoFilter/TodoFilter";
import { fetchTodos } from "@/api/FetchApi";
import { useState } from "react";
import type { Todo, TodoInfo, MetaResponse } from "@/models/Models";
import { useEffect } from "react";

function TodoPage() {
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [toDoInfo, setToDoInfo] = useState<TodoInfo>();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos(filter?: string) {
    let queryFilter: string = filter ? filter : activeFilter;
    const resData: MetaResponse<Todo, TodoInfo> = await fetchTodos(queryFilter);
    setToDos(resData.data);
    setToDoInfo(resData.info);
  }

  return (
    <div className="layout">
      <AddTodo updateTodos={getTodos} />
      <TodoFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        updateTodos={getTodos}
        toDoInfo={toDoInfo}
      />
      <ToDoList updateTodos={getTodos} toDos={toDos} />
    </div>
  );
}

export default TodoPage;
