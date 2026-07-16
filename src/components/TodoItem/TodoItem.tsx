import styles from "@/components/TodoItem/TodoItem.module.scss";
import type { Todo } from "@/models/Models";
import { useState } from "react";

const TodoItem: React.FC<{
  todo: Todo;
  deleteTodo: (id: number) => void;
  editToDo: (id: number) => void;
  changeTodoStatus: (id: number, currentStatus: boolean) => void;
  saveTodo: (id: number, todoTitle: string) => void;
  cancelEdit: (id: number) => void;
}> = (props) => {
  const [title, setTitle] = useState(props.todo.title);

  return (
    <li
      key={props.todo.id}
      className={`${styles.listItem} ${props.todo.isDone ? styles.listItemChecked : ""}`}
    >
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
            className={`${styles.todoTitle} ${props.todo.isDone ? styles.titleChecked : ""}`}
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            disabled={!props.todo.isEditing}
          ></input>
          <span className={styles.todoDate}>{props.todo.created}</span>
        </div>
      </div>

      <div className={styles.btns}>
        {props.todo.isEditing ? (
          <>
            <button
              className={`${styles.todoBtn} ${props.todo.isEditing ? styles.activeBtn : ""}`}
              onClick={() => props.saveTodo(props.todo.id, title)}
              disabled={props.todo.isDone}
              data-is-save-btn={props.todo.isEditing}
            >
              Сохранить
            </button>
            <button
              className={`${styles.todoBtn} ${styles.cancelBtn}`}
              onClick={() => props.cancelEdit(props.todo.id)}
            >
              Отмена
            </button>
          </>
        ) : (
          <button
            className={`${styles.todoBtn} ${props.todo.isEditing ? styles.activeBtn : ""}`}
            onClick={() => props.editToDo(props.todo.id)}
            disabled={props.todo.isDone}
            data-is-save-btn={props.todo.isEditing}
          >
            Редактировать
          </button>
        )}

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
