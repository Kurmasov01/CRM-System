import styles from "@/components/TodoItem/TodoItem.module.scss";
import type { Todo } from "@/models/Models";

function TitleChangeHandler(event: React.ChangeEvent) {
  console.log(event.currentTarget);
}

const TodoItem: React.FC<{
  todo: Todo;
  deleteTodo: (id: number) => void;
  editToDo: (id: number) => void;
  changeTodoStatus: (id: number, currentStatus: boolean) => void;
}> = (props) => {
  return (
    <li key={props.todo.id} className={`${styles.listItem} ${props.todo.isDone ? styles.listItemChecked : ''}`}>
      <div className={styles.todoLeft}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            onChange={() =>
              props.changeTodoStatus(props.todo.id, props.todo.isDone)
            }
            checked={props.todo.isDone}
          />
          <span className={styles.checkboxMark}></span>
        </label>
        <div className={styles.todoInfo}>
          <input
            className={`${styles.todoTitle} ${props.todo.isDone ? styles.titleChecked : ''}`}
            value={props.todo.title}
            onChange={(event) => TitleChangeHandler(event)}
            disabled={!props.todo.isEditing}
          ></input>
          <span className={styles.todoDate}>{props.todo.created}</span>
        </div>
      </div>

      <div className={styles.btns}>
        <button
          className={`${styles.todoBtn} ${props.todo.isEditing ? styles.activeBtn : ""}`}
          onClick={() => props.editToDo(props.todo.id)}
          disabled={props.todo.isDone}
        >
          {props.todo.isEditing ? "Сохранить" : "Редактировать"}
        </button>
        <button
          className={`${styles.todoBtn} ${styles.deleteBtn}`}
          onClick={() => {
            props.deleteTodo(props.todo.id);
          }}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
