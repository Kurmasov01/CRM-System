import styles from "@/components/TodoFilter/ToDoList.module.scss";
import type { TodoInfo } from "@/models/Models";

const TodoFilter: React.FC<{
  updateTodos: (activeFilter: string) => void;
  setActiveFilter: (filter: string) => void
  activeFilter: string;
  toDoInfo?: TodoInfo;
}> = (props) => {

  function onFilterChange(filter: string) {
    props.setActiveFilter(filter);
    props.updateTodos(filter);
  }

  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filter} ${props.activeFilter === "all" ? styles.active : ""}`}
        onClick={() => {
          onFilterChange("all");
        }}
      >
        Все ({props.toDoInfo?.all})
      </button>

      <button
        className={`${styles.filter} ${props.activeFilter === "inWork" ? styles.active : ""}`}
        onClick={() => {
          onFilterChange("inWork");
        }}
      >
        В работе ({props.toDoInfo?.inWork})
      </button>

      <button
        className={`${styles.filter} ${props.activeFilter === "completed" ? styles.active : ""}`}
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
