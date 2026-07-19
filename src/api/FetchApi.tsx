import type {
  Todo,
  MetaResponse,
  TodoInfo,
  TodoRequest,
} from "@/models/Models";

const baseUrl = "https://easydev.club/api/v1";

export async function fetchTodos(
  activeFilter?: string,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await fetch(`${baseUrl}/todos?filter=${activeFilter}`);
    const resData: MetaResponse<Todo, TodoInfo> = await response.json();

    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchAddtodo(todoTitle: string): Promise<Todo> {
  const todo: TodoRequest = {
    title: todoTitle,
  };

  try {
    const response = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
    });
    const resData: Todo = await response.json();

    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchDeleteTodo(id: number): Promise<boolean> {
  try {
    await fetch(`${baseUrl}/todos/${id}`, {
      method: "DELETE",
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchEditTodo(
  id: number,
  todo: TodoRequest,
): Promise<Todo> {
  try {
    const response = await fetch(`${baseUrl}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });
    const resData: Todo = await response.json();
    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
