import type {
  Todo,
  MetaResponse,
  TodoInfo,
  TodoRequest,
  TodoActiveFilter,
} from "@/models/Models";

import axios from "axios";

const baseUrl: string = "https://easydev.club/api/v1";

export async function getTodos(
  activeFilter?: TodoActiveFilter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axios.get(`${baseUrl}/todos?filter=${activeFilter}`);
  const resData: MetaResponse<Todo, TodoInfo> = response.data;

  return resData;
}

export async function addTodo(todoTitle: string): Promise<Todo> {
  const todo: TodoRequest = {
    title: todoTitle,
  };

  const response = await axios.post(`${baseUrl}/todos`, todo);
  const resData: Todo = await response.data;

  return resData;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const response = await axios.delete(`${baseUrl}/todos/${id}`);

  return response.status === 200;
}

export async function editTodo(id: number, todo: TodoRequest): Promise<Todo> {
  const response = await axios.put(`${baseUrl}/todos/${id}`, todo);
  console.log(response);
  const resData: Todo = await response.data;
  return resData;
}
