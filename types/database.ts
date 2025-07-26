export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          uuid: string
          title: string
          is_done: boolean
          created_at: string
          user_id: string
        }
        Insert: {
          title: string
          user_id: string
        }
      }
    }
  }
} 