import { useSupabaseClient } from '#imports';
import { Task } from "../models/task";


class TaskService {
    async retrieveTasks(): Promise<Task[]> {
        const supabase = useSupabaseClient();
        
        const { data, error } = await supabase
            .from('tasks')
            .select('*');

        
        if (error) throw error;
        
        return Promise.resolve((data ?? []).map((task: any) => new Task(task.uuid, task.title, task.is_done, task.created_at)));
    }

    async insertTask(title: string): Promise<void> {
        const user = useSupabaseUser()
const supabase = useSupabaseClient();

        const { data, error } = await supabase
        .from('tasks')
        .insert([
        { user_id: user.value?.id, title: title },
        ])
        .select()
                
        if (error) throw error;

        return Promise.resolve();

    }

    // async completeTask(task: Task): Promise<Task> {
    //     return Promise.resolve(new Task(task.name, true));
    // }
}

export const taskService = new TaskService();