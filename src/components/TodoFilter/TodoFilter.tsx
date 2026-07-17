import styles from "@/components/TodoFilter/ToDoList.module.scss";
import type { Todo, MetaResponse, TodoInfo } from "@/models/Models";
import { useState } from "react";

const TodoFilter: React.FC<{
  fetchTodosInfo: (status: string) => void;
  onFilterChange: (filter: string) => void;
  toDoInfo?: TodoInfo;
  activeFilter: string
}> = (props) => {
  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filter} ${props.activeFilter === "all" ? styles.active : ""}`}
        onClick={() => {
          props.onFilterChange("all");
        }}
      >
        Все ({props.toDoInfo?.all})
      </button>

      <button
        className={`${styles.filter} ${props.activeFilter === "inWork" ? styles.active : ""}`}
        onClick={() => {
          props.onFilterChange("inWork");
        }}
      >
        В работе ({props.toDoInfo?.inWork})
      </button>

      <button
        className={`${styles.filter} ${props.activeFilter === "completed" ? styles.active : ""}`}
        onClick={() => {
          props.onFilterChange("completed");
        }}
      >
        Сделано ({props.toDoInfo?.completed})
      </button>
    </div>
  );
};

export default TodoFilter;
