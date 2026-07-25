import styles from "@/components/AddTodo/AddTodo.module.scss";
import { addTodo } from "@/api/FetchApi";
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
      try {
        const response = await addTodo(todoTitle);
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
      <div className={styles.wrapper}>
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
    </div>
  );
};

export default Addtodo;
