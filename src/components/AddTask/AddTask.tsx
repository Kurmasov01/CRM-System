import styles from "@/components/AddTask/AddTask.module.scss";
import React from "react";
import { useRef } from "react";

const AddTask: React.FC = (props) => {
  const taskInput = useRef<HTMLInputElement>(null);
  function handleAddTask() {
    console.log(taskInput.current?.value);
  }

  return (
    <>
      <div className="layout">
        <section className="section">
          <div className="add-task">
            <h1 className={styles.heading}>Мои задачи</h1>
            <input
              className={styles.input}
              type="text"
              placeholder="Введите название"
              ref={taskInput}
            />
            <button className={styles.btn} onClick={() => handleAddTask()}>
              Добавить
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddTask;
