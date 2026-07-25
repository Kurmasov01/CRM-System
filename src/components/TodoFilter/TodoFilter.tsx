import styles from "@/components/TodoFilter/TodoFilter.module.scss";
import type { TodoInfo } from "@/models/Models";

interface Props {
  updateTodos: (activeFilter: string) => void;
  setActiveFilter: (filter: string) => void;
  activeFilter: string;
  todoInfo?: TodoInfo;
}

const TodoFilter: React.FC<Props> = (props) => {
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
        Все ({props.todoInfo?.all})
      </button>

      <button
        className={`${styles.filter} ${props.activeFilter === "inWork" ? styles.active : ""}`}
        onClick={() => {
          onFilterChange("inWork");
        }}
      >
        В работе ({props.todoInfo?.inWork})
      </button>

      <button
        className={`${styles.filter} ${props.activeFilter === "completed" ? styles.active : ""}`}
        onClick={() => {
          onFilterChange("completed");
        }}
      >
        Сделано ({props.todoInfo?.completed})
      </button>
    </div>
  );
};

export default TodoFilter;
