import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getTodosByUserId, insertTodo, getTodoById, updateTodo, deleteTodo } from '../db/queries';
import { 
  createTodoValidator, 
  updateTodoValidator, 
  todoParamValidator,
  type CreateTodoInput,
  type UpdateTodoInput,
  type TodoParam
} from '../validators/todos.validator';
import type { HonoEnv } from '@/db/types';

export const todos = new Hono<HonoEnv>();

todos.use(authMiddleware);

// Get all todos for the authenticated user
todos.get('/', async (c) => {
  const user = c.get('user');

  try {
    const todoList = await getTodosByUserId(user.id);
    return c.json(todoList);
  } catch (error) {
    console.error('Error fetching todos: ', error);
    return c.json({ error: 'Failed to fetch todos' }, 500);
  }
});

// Get a single todo by ID
todos.get('/:id', todoParamValidator, async (c) => {
  const user = c.get('user');
  const { id } = c.req.valid('param') as TodoParam;

  try {
    const todo = await getTodoById(id, user.id);
    
    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404);
    }

    return c.json(todo);
  } catch (error) {
    console.error('Error fetching todo: ', error);
    return c.json({ error: 'Failed to fetch todo' }, 500);
  }
});

// Create a new todo
todos.post('/', createTodoValidator, async (c) => {
  const user = c.get('user');
  const todoData = c.req.valid('json') as CreateTodoInput;

  try {
    const newTodo = await insertTodo({
      title: todoData.title,
      description: todoData.description,
      completed: todoData.completed ?? false,
      userId: user.id,
    });
    return c.json(newTodo, 201);
  } catch (error) {
    console.error('Error creating todo: ', error);
    return c.json({ error: 'Failed to create todo' }, 500);
  }
});

// Update a todo
todos.patch('/:id', todoParamValidator, updateTodoValidator, async (c) => {
  const user = c.get('user');
  const { id } = c.req.valid('param') as TodoParam;
  const updateData = c.req.valid('json') as UpdateTodoInput;

  try {
    const updatedTodo = await updateTodo(id, user.id, updateData);
    
    if (!updatedTodo) {
      return c.json({ error: 'Todo not found' }, 404);
    }

    return c.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo: ', error);
    return c.json({ error: 'Failed to update todo' }, 500);
  }
});

// Delete a todo
todos.delete('/:id', todoParamValidator, async (c) => {
  const user = c.get('user');
  const { id } = c.req.valid('param') as TodoParam;

  try {
    const deletedTodo = await deleteTodo(id, user.id);
    
    if (!deletedTodo) {
      return c.json({ error: 'Todo not found' }, 404);
    }

    return c.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    console.error('Error deleting todo: ', error);
    return c.json({ error: 'Failed to delete todo' }, 500);
  }
});
