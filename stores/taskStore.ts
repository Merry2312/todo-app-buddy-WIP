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
        async addTask(title: string): Promise<void> {
            return taskService.insertTask(title).then(async () => {
                await this.requestTasks();
            }).catch((error) => {
                console.log("Failure! " + error);
            });
        }
        // async completeTask(task: Task): Promise<void> {
        //     return taskService.completeTask(task).then(() => {
        //         task.completed = true;
        //     }).catch((error) => {
        //         console.log("Failure! " + error);
        //     });
        // }
    },
});
