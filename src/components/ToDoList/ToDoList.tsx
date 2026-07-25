import styles from "@/components/TodoList/TodoList.module.scss";
import TodoItem from "@/components/TodoItem/TodoItem";
import type { Todo } from "@/models/Models";

interface Props {
  todos: Todo[];
  updateTodos: () => void;
}

const TodoList: React.FC<Props> = (props) => {
  return (
    <div className="section">
      <div className={styles.wrapper}>
        {props.todos.length !== 0 ? (
          <ul className={styles.list}>
            {props.todos.map((todo) => (
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

export default TodoList;
