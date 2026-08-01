import type {
  Todo,
  MetaResponse,
  TodoInfo,
  TodoRequest,
  TodoActiveFilter
} from "@/models/Models";

const baseUrl:string = "https://easydev.club/api/v1";

export async function getTodos(
  activeFilter?: TodoActiveFilter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(`${baseUrl}/todos?filter=${activeFilter}`);
  const resData: MetaResponse<Todo, TodoInfo> = await response.json();

  return resData;
}

export async function addTodo(todoTitle: string): Promise<Todo> {
  const todo: TodoRequest = {
    title: todoTitle,
  };

  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
  });
  const resData: Todo = await response.json();
  return resData;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}

export async function editTodo(id: number, todo: TodoRequest): Promise<Todo> {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
  const resData: Todo = await response.json();
  return resData;
}
