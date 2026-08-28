import TodoItem from "@/components/TodoItem/TodoItem";
import type { Todo } from "@/models/Models";
import { List, Empty, Typography } from "antd";
interface Props {
  todos: Todo[];
  updateTodos: () => void;
  setPauseTimer: (pauseValue: boolean) => void;
}

const TodoList: React.FC<Props> = (props) => {
  return (
    <>
      {props.todos.length !== 0 ? (
        <List
          dataSource={props.todos}
          renderItem={(todo) => (
            <TodoItem
              updateTodos={props.updateTodos}
              setPauseTimer={props.setPauseTimer}
              key={todo.id}
              todo={todo}
            />
          )}
        />
      ) : (
        <Empty
          description={<Typography.Text>Текущих задач нет</Typography.Text>}
        ></Empty>
      )}
    </>
  );
};

export default TodoList;
