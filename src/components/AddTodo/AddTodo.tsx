import styles from "@/components/AddTodo/AddTodo.module.scss";
import { fetchAddtodo } from "@/api/FetchApi";
import React, { useState } from "react";
import { useRef } from "react";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";

const Addtodo: React.FC<{ updateTodos: () => void }> = (props) => {
  const [errorText, setErrorText] = useState("");
  const todoInput = useRef<HTMLInputElement>(null);

  async function handleAddtodo(todoTitle: string | undefined) {
    todoTitle = todoTitle?.trim();
    const error = validateTodoTitle(todoTitle);
    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");

    if (todoTitle && todoInput.current) {
      const response = await fetchAddtodo(todoTitle);

      if (response) {
        props.updateTodos();
        todoInput.current.value = "";
      }
    }
  }

  return (
    <section className="section">
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Мои задачи</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите название"
          ref={todoInput}
        />
        <button
          className={styles.btn}
          onClick={() => handleAddtodo(todoInput.current?.value)}
        >
          Добавить
        </button>
      </div>
      {errorText && <span className={styles.error}>{errorText}</span>}
    </section>
  );
};

export default Addtodo;
