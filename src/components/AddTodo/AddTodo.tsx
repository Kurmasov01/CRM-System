import styles from "@/components/AddTodo/AddTodo.module.scss";
import { addTodo } from "@/api/FetchApi";
import React, { useState } from "react";
import { useRef } from "react";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";

const Addtodo: React.FC<{ updateTodos: () => void }> = (props) => {
  const [errorText, setErrorText] = useState("");
  const todoInput = useRef<HTMLInputElement>(null);

  function handleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    handleAddtodo(todoInput.current?.value);
  }

  async function handleAddtodo(todoTitle: string | undefined) {
    const trimedTitle = todoTitle?.trim();
    const error = validateTodoTitle(trimedTitle);
    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");

    if (trimedTitle && todoInput.current) {
      try {
        const response = await addTodo(trimedTitle);
        if (response) {
          props.updateTodos();
          todoInput.current.value = "";
        }
      } catch (error) {
        alert("Не удалось создать задачу, ошибка: " + error);
      }
    }
  }

  return (
    <div className="section">
      <form
        className={styles.wrapper}
        onSubmit={(event) => handleFormSubmit(event)}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Введите название"
          ref={todoInput}
        />
        <button type="submit" className={styles.btn}>
          Добавить
        </button>
      </form>
      {errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};

export default Addtodo;
