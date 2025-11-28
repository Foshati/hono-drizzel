import { desc, eq } from "drizzle-orm";
import db from ".";
import { todos } from "./schema";
import type { NewTodo } from "./types";

export const insertTodo = async (todo: NewTodo) => {
  const result = await db.insert(todos).values(todo).returning();
  return result[0];
};

export const getTodosByUserId = async (userId: string) => {
  const result = await db.select().from(todos).where(eq(todos.userId, userId)).orderBy(desc(todos.createdAt))
  return result;
};

export const getTodoById = async (id: string, userId: string) => {
  const result = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
  if (result.length === 0 || result[0].userId !== userId) {
    return null;
  }
  return result[0];
};

export const updateTodo = async (id: string, userId: string, data: Partial<NewTodo>) => {
  const result = await db
    .update(todos)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(todos.id, id))
    .returning();
  
  if (result.length === 0 || result[0].userId !== userId) {
    return null;
  }
  return result[0];
};

export const deleteTodo = async (id: string, userId: string) => {
  const todo = await getTodoById(id, userId);
  if (!todo) {
    return null;
  }
  
  await db.delete(todos).where(eq(todos.id, id));
  return todo;
};
