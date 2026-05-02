export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      job_applications: {
        Row: {
          id: string;
          user_id: string | null;
          company: string;
          role: string;
          job_url: string | null;
          date_applied: string;
          status: string;
          notes: string | null;
          priority: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          company: string;
          role: string;
          job_url?: string | null;
          date_applied: string;
          status?: string;
          notes?: string | null;
          priority?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          company?: string;
          role?: string;
          job_url?: string | null;
          date_applied?: string;
          status?: string;
          notes?: string | null;
          priority?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
