import styles from "@/components/AddTodo/AddTodo.module.scss";
import React from "react";
import { useRef } from "react";

const Addtodo: React.FC<{
  handleAddtodo: (todoTitle: string | undefined) => {};
  errorText: string;
}> = (props) => {
  const todoInput = useRef<HTMLInputElement>(null);

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
            onClick={() => props.handleAddtodo(todoInput.current?.value)}
          >
            Добавить
          </button>
        </div>
        {props.errorText !== "" ? (
          <span className={styles.error}>{props.errorText}</span>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Addtodo;
