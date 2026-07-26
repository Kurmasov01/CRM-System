import styles from "@/components/TodoItem/TodoItem.module.scss";
import type { Todo, TodoRequest } from "@/models/Models";
import { useState } from "react";
import { deleteTodo, editTodo } from "@/api/FetchApi";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";

interface Props {
  todo: Todo;
  updateTodos: () => void;
}

const TodoItem: React.FC<Props> = (props) => {
  const [title, setTitle] = useState<string>(props.todo.title);
  const [errorText, setErrorText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function handleSaveTodo(id: number, todoTitle: string) {
    const error = validateTodoTitle(todoTitle);

    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");

    const todo: TodoRequest = {
      title: todoTitle,
    };
    try {
      const response = await editTodo(id, todo);
      if (response) {
        setIsEditing(false);
        props.updateTodos();
      }
    } catch (error) {
      alert("Не удалось сохранить задачу, ошибка: " + error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      const response = await deleteTodo(id);

      if (response) {
        props.updateTodos();
      }
    } catch (error) {
      alert("Не удалось удалить задачу, ошибка: " + error);
    }
  }

  async function changeTodoStatus(id: number, currentStatus: boolean) {
    const todo: TodoRequest = {};
    todo.isDone = !currentStatus;
    try {
      const response = await editTodo(id, todo);
      if (response) {
        props.updateTodos();
      }
    } catch (error) {
      alert("Не удалось обновить статус задачи, ошибка: " + error);
    }
  }

  function onCancelEdit() {
    setIsEditing(false);
    setTitle(props.todo.title);
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
            onChange={() => changeTodoStatus(props.todo.id, props.todo.isDone)}
            checked={props.todo.isDone}
          />
          <span className={styles.checkboxMark}></span>
        </label>
        <div className={styles.todoInfo}>
          <input
            className={`${styles.todoTitle} ${props.todo.isDone ? styles.titleChecked : ""}`}
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            disabled={!isEditing}
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
        {isEditing ? (
          <>
            <button
              className={`${styles.todoBtn} ${isEditing ? styles.activeBtn : ""}`}
              onClick={() => handleSaveTodo(props.todo.id, title)}
              disabled={props.todo.isDone}
            >
              Сохранить
            </button>
            <button
              className={`${styles.todoBtn} ${styles.cancelBtn}`}
              onClick={() => onCancelEdit()}
            >
              Отмена
            </button>
          </>
        ) : (
          <button
            className={`${styles.todoBtn} ${isEditing ? styles.activeBtn : ""}`}
            onClick={() => {
              setIsEditing(true);
            }}
            disabled={props.todo.isDone}
          >
            Редактировать
          </button>
        )}

        <button
          className={`${styles.todoBtn} ${styles.deleteBtn}`}
          onClick={() => {
            handleDeleteTodo(props.todo.id);
          }}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
