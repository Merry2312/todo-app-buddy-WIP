import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Array<{
      id: string
      title: string
      completed: boolean
      createdAt: Date
    }>,
    loading: false
  }),
  
  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    pendingTodos: (state) => state.todos.filter(todo => !todo.completed),
    totalTodos: (state) => state.todos.length
  },
  
  actions: {
    addTodo(title: string) {
      const todo = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: new Date()
      }
      this.todos.push(todo)
    },
    
    toggleTodo(id: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    
    removeTodo(id: string) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    
    clearCompleted() {
      this.todos = this.todos.filter(t => !t.completed)
    }
  }
}) 