import styles from "@/components/ToDoList/ToDoList.module.scss";
import TodoItem from "@/components/TodoItem/TodoItem";
import type { Todo } from "@/models/Models";

const ToDoList: React.FC<{
  toDos: Todo[];
  updateTodos: () => void;
}> = (props) => {
  return (
    <div className="section">
      <div className={styles.wrapper}>
        {props.toDos.length !== 0 ? (
          <ul className={styles.list}>
            {props.toDos.map((todo) => (
              <TodoItem
                updateTodos={props.updateTodos}
                key={todo.id}
                todo={todo}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.noTodosText}>
            <span>Текущих задач нет</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
