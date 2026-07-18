import styles from "@/components/TodoItem/TodoItem.module.scss";
import type { Todo } from "@/models/Models";
import { useState } from "react";

import { validateTodoTitle } from "@/pages/TodoPage";

const TodoItem: React.FC<{
  todo: Todo;
  deleteTodo: (id: number) => void;
  editToDo: (id: number) => void;
  changeTodoStatus: (id: number, currentStatus: boolean) => void;
  handleSaveTodo: (id: number, todoTitle: string) => void;
  cancelEdit: (id: number) => void;
}> = (props) => {
  const [title, setTitle] = useState(props.todo.title);
  const [errorText, setErrorText] = useState("");
  console.log(props.todo);
  let originalTitle: string = props.todo.title;
  console.log(originalTitle);

  function onSaveTodo(id: number, title: string) {
    const error = validateTodoTitle(title);
    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");
    props.handleSaveTodo(id, title);
  }

  function onCancelEdit(id: number, originalTitle: string) {
    setTitle(originalTitle);
    console.log(originalTitle);
    props.cancelEdit(id);
  }

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
          {errorText !== "" ? (
            <span className={styles.error}>{errorText}</span>
          ) : (
            ""
          )}
          <span className={styles.todoDate}>{props.todo.created}</span>
        </div>
      </div>

      <div className={styles.btns}>
        {props.todo.isEditing ? (
          <>
            <button
              className={`${styles.todoBtn} ${props.todo.isEditing ? styles.activeBtn : ""}`}
              onClick={() => onSaveTodo(props.todo.id, title)}
              disabled={props.todo.isDone}
              data-is-save-btn={props.todo.isEditing}
            >
              Сохранить
            </button>
            <button
              className={`${styles.todoBtn} ${styles.cancelBtn}`}
              onClick={() => onCancelEdit(props.todo.id, originalTitle)}
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
