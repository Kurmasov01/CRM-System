import styles from "@/components/TodoFilter/ToDoList.module.scss";
import type { Todo, MetaResponse, TodoInfo } from "@/models/Models";
import { useState } from "react";

const TodoFilter: React.FC<{
  fetchTodosInfo: (status: string) => void;
  toDoInfo?: TodoInfo;
}> = (props) => {
    const [activeFilter, setActiveFilter] = useState('all')

    function onFilterChange (filter: string) {
        setActiveFilter(filter)
        props.fetchTodosInfo(filter)
    }
  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filter} ${activeFilter === 'all' ? styles.active : ''}`}
        onClick={() => {
          onFilterChange("all");
        }}
      >
        Все ({props.toDoInfo?.all})
      </button>

      <button
        className={`${styles.filter} ${activeFilter === 'inWork' ? styles.active : ''}`}
        onClick={() => {
          onFilterChange("inWork");
        }}
      >
        В работе ({props.toDoInfo?.inWork})
      </button>

      <button
        className={`${styles.filter} ${activeFilter === 'completed' ? styles.active : ''}`}
        onClick={() => {
          onFilterChange("completed");
        }}
      >
        Сделано ({props.toDoInfo?.completed})
      </button>
    </div>
  );
};

export default TodoFilter;
