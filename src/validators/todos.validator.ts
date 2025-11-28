import { Type, type Static } from '@sinclair/typebox';
import { tbValidator } from '@hono/typebox-validator';

// Schema for creating a new todo
export const createTodoSchema = Type.Object({
  title: Type.String({ 
    minLength: 1, 
    maxLength: 500,
  }),
  description: Type.String({ 
    minLength: 1, 
    maxLength: 500,
  }),
  completed: Type.Optional(Type.Boolean()),
});

// Schema for updating an existing todo
export const updateTodoSchema = Type.Object({
  title: Type.Optional(Type.String({ 
    minLength: 1, 
    maxLength: 500 
  })),
  description: Type.Optional(Type.String({ 
    minLength: 1, 
    maxLength: 500 
  })),
  completed: Type.Optional(Type.Boolean()),
});

// Schema for todo ID parameter (UUID format)
export const todoParamSchema = Type.Object({
  id: Type.String({
    minLength: 36,
    maxLength: 36,
  }),
});

// Export types
export type CreateTodoInput = Static<typeof createTodoSchema>;
export type UpdateTodoInput = Static<typeof updateTodoSchema>;
export type TodoParam = Static<typeof todoParamSchema>;

// Validators
export const createTodoValidator = tbValidator('json', createTodoSchema);
export const updateTodoValidator = tbValidator('json', updateTodoSchema);
export const todoParamValidator = tbValidator('param', todoParamSchema);
