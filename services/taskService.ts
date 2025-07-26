import { useSupabaseClient, useSupabaseUser } from '#imports';
import { Task } from "../models/task";
import type { Database } from '../types/database';

class TaskService {
    async retrieveTasks(): Promise<Task[]> {
        const supabase = useSupabaseClient<Database>();

        const { data, error } = await supabase
            .from('tasks')
            .select('*');

        if (error) throw error;

        return Promise.resolve((data ?? []).map((task: any) => new Task(task.uuid, task.title, task.is_done, task.created_at)));
    }

    async createTask(title: string): Promise<Task> {
        const user = useSupabaseUser();
        const supabase = useSupabaseClient<Database>();

        const { data, error } = await supabase
            .from('tasks')
            .insert([
                { user_id: user.value?.id as string, title }
            ])
            .select()
            .single();

        if (error) throw error;

        console.log(data)

        return new Task(data.uuid, data.title, data.is_done, data.created_at);
    }

    async deleteTask(uuid: string): Promise<void> {
        const supabase = useSupabaseClient<Database>();

        const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('uuid', uuid)

        if (error) throw error;

        return Promise.resolve();
    }

    async toggleTask(uuid: string, isDone: boolean): Promise<void> {
        const supabase = useSupabaseClient<Database>();

        const { error } = await supabase
        .from('tasks')
        .update({ is_done: isDone })
        .eq('uuid', uuid)
                
        if (error) throw error;

        return Promise.resolve();
    }
}

export const taskService = new TaskService();