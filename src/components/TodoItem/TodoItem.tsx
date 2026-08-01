import styles from "@/components/TodoItem/TodoItem.module.scss";
import type { Todo, TodoRequest } from "@/models/Models";
import { useState } from "react";
import { deleteTodo, editTodo } from "@/api/FetchApi";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";
import IconButton from "@/ui/IconButton/IconButton";
import Input from "@/ui/Input/Input";
import Checkbox from "@/ui/Checkbox/Checkbox";

import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import CancelIcon from "@/assets/icons/CancelIcon";
import SaveIcon from "@/assets/icons/SaveIcon";

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
        className={`${styles.listItem} ${props.todo.isDone && styles.listItemChecked}`}
        onSubmit={(event) => handleTitleFormSubmit(event)}
      >
        <div className={styles.todoLeft}>
          <Checkbox
            onChange={() => changeTodoStatus(props.todo.id, props.todo.isDone)}
            checked={props.todo.isDone}
          ></Checkbox>
          <div className={styles.todoInfo}>
            <Input
              className={`${styles.todoTitle} ${props.todo.isDone && styles.titleChecked}`}
              variant="title"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              disabled={!isEditing}
            />
            {errorText !== "" && (
              <span className={styles.error}>{errorText}</span>
            )}
            <span className={styles.todoDate}>{props.todo.created}</span>
          </div>
        </div>

        <div className={styles.btns}>
          {isEditing ? (
            <>
              <IconButton
                variant="primary"
                type="submit"
                disabled={props.todo.isDone}
              >
                <SaveIcon size={18}></SaveIcon>
              </IconButton>
              <IconButton
                variant="neutral"
                type="button"
                disabled={props.todo.isDone}
                onClick={onCancelEdit}
              >
                <CancelIcon size={18}></CancelIcon>
              </IconButton>
            </>
          ) : (
            <IconButton
              variant="primary"
              type="button"
              disabled={props.todo.isDone}
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <EditIcon size={18}></EditIcon>
            </IconButton>
          )}
          <IconButton
            variant="danger"
            type="button"
            onClick={() => {
              handleDeleteTodo(props.todo.id);
            }}
          >
            <DeleteIcon size={18}></DeleteIcon>
          </IconButton>
        </div>
      </form>
    </li>
  );
};

export default TodoItem;
