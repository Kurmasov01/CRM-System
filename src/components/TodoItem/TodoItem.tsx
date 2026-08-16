import type { Todo, TodoRequest } from "@/models/Models";
import { useState } from "react";
import { deleteTodo, editTodo } from "@/api/FetchApi";
import { Form, List, Typography, Checkbox, Button, Flex, Input } from "antd";
import styles from "@/components/TodoItem/TodoItem.module.scss";

import { validateTodoTitle } from "@/helpers/validateTodoTitle";

import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";

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

  return (
    <List.Item key={props.todo.id}>
      <Form
        layout="inline"
        style={{ width: "100%" }}
        onFinish={() => handleSaveTodo(props.todo.id, title)}
      >
        <Flex justify="space-between" style={{ width: "100%" }}>
          <Flex gap={"medium"}>
            <Checkbox
              checked={props.todo.isDone}
              onChange={() =>
                changeTodoStatus(props.todo.id, props.todo.isDone)
              }
            />
            <Flex vertical>
              <Form.Item
                validateTrigger="onBlur"
                rules={[{ whitespace: true, required: true, min: 2, max: 64 }]}
              >
                <Input
                  className={styles.todoTitle}
                  size="large"
                  onChange={(event) => setTitle(event.currentTarget.value)}
                  value={title}
                  variant="borderless"
                  disabled={!isEditing}
                />
              </Form.Item>

              {errorText && (
                <Typography.Text type="danger">{errorText}</Typography.Text>
              )}
              <Typography.Text type="secondary">
                {props.todo.created}
              </Typography.Text>
            </Flex>
          </Flex>

          <Flex gap={"small"} align="center">
            {isEditing ? (
              <>
                <Button
                  color="primary"
                  variant="solid"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  disabled={props.todo.isDone}
                />
                <Button
                  color="default"
                  variant="solid"
                  icon={<StopOutlined />}
                  disabled={props.todo.isDone}
                  onClick={onCancelEdit}
                />
              </>
            ) : (
              <Button
                disabled={props.todo.isDone}
                color="primary"
                variant="solid"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            )}
            <Button
              color="danger"
              variant="solid"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteTodo(props.todo.id);
              }}
            />
          </Flex>
        </Flex>
      </Form>
    </List.Item>
  );
};

export default TodoItem;
