import type {
  Todo,
  MetaResponse,
  TodoInfo,
  TodoRequest,
  TodoActiveFilter,
} from "@/models/Models";

import axios from "axios";

const baseUrl: string = "http://159.194.224.99:8082/api/v1";

export async function getTodos(
  activeFilter?: TodoActiveFilter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const statuses = activeFilter === "all" ? "done,inProgress" : activeFilter;

  const response = await axios.get(`${baseUrl}/tasks?statuses=${statuses}`);
  const resData: MetaResponse<Todo, TodoInfo> = response.data;
  return resData;
}

export async function addTodo(todoTitle: string): Promise<Todo> {
  const todo: TodoRequest = {
    title: todoTitle,
    executorId: 1,
    status: "inProgress"
  };

  const response = await axios.post(`${baseUrl}/tasks`, todo);
  const resData: Todo = await response.data;

  return resData;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const response = await axios.delete(`${baseUrl}/tasks/${id}`);

  return response.status === 200;
}

export async function editTodo(id: number, todo: TodoRequest): Promise<Todo> {
  const response = await axios.put(`${baseUrl}/tasks/${id}`, todo);
  const resData: Todo = await response.data;
  return resData;
}
