import styles from "@/components/TodoItem/TodoItem.module.scss";
import type { Todo, TodoRequest } from "@/models/Models";
import { useState } from "react";
import { deleteTodo, editTodo } from "@/api/FetchApi";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";

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

  function handleTitleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSaveTodo(props.todo.id, title);
  }

  return (
    <li key={props.todo.id}>
      <form
        className={`${styles.listItem} ${props.todo.isDone ? styles.listItemChecked : ""}`}
        onSubmit={(event) => handleTitleFormSubmit(event)}
      >
        <div className={styles.todoLeft}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              onChange={() =>
                changeTodoStatus(props.todo.id, props.todo.isDone)
              }
              checked={props.todo.isDone}
            />
            <span className={styles.checkboxMark}></span>
          </label>
          <div className={styles.todoInfo}>
            <Input
              className={`${styles.todoTitle} ${props.todo.isDone ? styles.titleChecked : ""}`}
              variant="title"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              disabled={!isEditing}
            />
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
              <Button
                variant="primary"
                type="submit"
                disabled={props.todo.isDone}
              >
                Сохранить
              </Button>
              <Button
                variant="neutral"
                type="button"
                disabled={props.todo.isDone}
                onClick={() => onCancelEdit()}
              >
                Отмена
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              type="button"
              disabled={props.todo.isDone}
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Редактировать
            </Button>
          )}

          <Button
            variant="danger"
            type="button"
            onClick={() => {
              handleDeleteTodo(props.todo.id);
            }}
          >
            Удалить
          </Button>
        </div>
      </form>
    </li>
  );
};

export default TodoItem;
