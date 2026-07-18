import styles from "@/components/AddTodo/AddTodo.module.scss";
import React, { useState } from "react";
import { useRef } from "react";

import { validateTodoTitle } from "@/pages/TodoPage";

const Addtodo: React.FC<{
  handleAddtodo: (todoTitle: string | undefined) => {};
  errorText: string;
}> = (props) => {
  const [errorText, setErrorText] = useState("");
  const todoInput = useRef<HTMLInputElement>(null);

  function addTodo(title: string | undefined) {
    const error = validateTodoTitle(title);
    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");
    props.handleAddtodo(title);
    if (todoInput.current) {
      todoInput.current.value = "";
    }
  }

  return (
    <>
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
            onClick={() => addTodo(todoInput.current?.value)}
          >
            Добавить
          </button>
        </div>
        {errorText !== "" ? (
          <span className={styles.error}>{errorText}</span>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Addtodo;
