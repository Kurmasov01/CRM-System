import styles from "@/components/AddTodo/AddTodo.module.scss";
import { addTodo } from "@/api/FetchApi";
import React, { useState } from "react";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";

interface Props {
  updateTodos: () => Promise<void>;
}

const Addtodo: React.FC<Props> = (props) => {
  const [errorText, setErrorText] = useState("");
  const [titleValue, setTitleValue] = useState("");

  function handleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    handleAddtodo(titleValue);
  }

  async function handleAddtodo(todoTitle: string | undefined) {
    const trimedTitle = todoTitle?.trim();
    const error = validateTodoTitle(trimedTitle);
    if (error) {
      setErrorText(error);
      return;
    }

    setErrorText("");

    if (trimedTitle && titleValue) {
      try {
        const response = await addTodo(trimedTitle);
        if (response) {
          await props.updateTodos();
          setTitleValue("");
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
          value={titleValue}
          onChange={(event) => {setTitleValue(event.currentTarget.value)}}
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
