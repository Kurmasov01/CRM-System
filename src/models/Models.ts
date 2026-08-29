export type TodoRequest = {
  title: string;
  description?: string;
  executorId: number;
  status?: string;
  deadline?: string;
};

export interface Todo {
  id: number;
  title: string;
  createdAt: string;
  status: string;
}

export interface TodoInfo {
  backlog: number;
  done: number;
  inProgress: number;
  onHold: number;
  readyForRelease: number;
  review: number;
  todo: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  total: number;
  meta: {
    statusCounts: N;
  };
}

export type TodoActiveFilter = "all" | "inProgress" | "done";
