import { addTodo } from "@/api/FetchApi";
import { Button, Form, Input } from "antd";

interface Props {
  updateTodos: () => Promise<void>;
}

const Addtodo: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const validateMessages = {
    whitespace: "Поле не должно быть пустым",
    required: "Поле не должно быть пустым",
    string: {
      range: "Длина текста от ${min} до ${max} символов",
    },
  };

  async function handleAddtodo(values: { todo_title: string }) {
    const trimedTitle = values.todo_title?.trim();

    if (trimedTitle) {
      try {
        const response = await addTodo(trimedTitle);
        if (response) {
          await props.updateTodos();
        }
      } catch (error) {
        alert("Не удалось создать задачу, ошибка: " + error);
      }
    }
  }

  return (
    <Form
      layout="inline"
      form={form}
      validateMessages={validateMessages}
      onFinish={handleAddtodo}
    >
      <Form.Item
        name="todo_title"
        validateTrigger="onBlur"
        rules={[{ whitespace: true, required: true, min: 2, max: 64 }]}
      >
        <Input placeholder="Введите название" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Addtodo;
