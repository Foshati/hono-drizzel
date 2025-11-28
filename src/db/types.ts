import type { todos } from "./schema";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;
