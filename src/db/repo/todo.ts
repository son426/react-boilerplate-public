import { createCollection, type BaseEntity } from "../helper";

export interface Todo extends BaseEntity {
  userId: string;
  text: string;
  isCompleted: boolean;
  priority: 1 | 2 | 3;
}

export const todoRepo = createCollection<Todo>("todo");
