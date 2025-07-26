import { defineStore } from 'pinia';
import { Task } from '../models/task';
import { taskService } from '../services/taskService';

export const useTaskStore = defineStore('task', {
    state: () => ({ tasks: [] as Task[], loading: false }),
    getters: {
        totalTasks: (state) => state.tasks.length,
    },
    actions: {
        async requestTasks(): Promise<void> {
            this.tasks = [];
            this.loading = true;

            this.tasks = await taskService.retrieveTasks();

            this.loading = false;
        },
        async createTask(title: string): Promise<void> {
            return taskService.createTask(title).then((task: Task) => {
                this.tasks = [...this.tasks, task];
            }).catch((error) => {
                console.log("Failed to create task " + error);
            });
        },
        async deleteTask(uuid: string): Promise<void> {
            return taskService.deleteTask(uuid).then(() => {
                this.tasks = this.tasks.filter((task) => task.uuid != uuid);
            }).catch((error) => {
                console.log("Failed to delete task " + error);
            });
        },    
        async toggleTask(uuid: string, isDone: boolean): Promise<void> {
            return taskService.toggleTask(uuid, isDone).then(() => {
                this.tasks = this.tasks.map((task) => task.uuid == uuid ? { ...task, isDone: isDone } : task);
            }).catch((error) => {
                console.log("Failed to update task state " + error);
            });
        },
        reorderTasks(newOrder: Task[]): void {
            this.tasks = newOrder;
        },
    },
});
