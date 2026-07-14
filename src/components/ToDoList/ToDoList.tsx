import styles from "@/components/ToDoList/ToDoList.module.scss";
import TodoItem from "@/components/TodoItem/TodoItem";
import type {
  Todo,
  TodoInfo,
  TodoRequest,
  MetaResponse,
} from "@/models/Models";

const ToDoList: React.FC<{
  toDos: Todo[];
  deleteTodo: (id: number) => void;
  editToDo: (id: number) => void;
}> = (props) => {
  return (
    <>
      <div className="section">
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {props.toDos.map((todo) => (
              <TodoItem
                deleteTodo={props.deleteTodo}
                editToDo={props.editToDo}
                key={todo.id}
                todo={todo}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
