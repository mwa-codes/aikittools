# Supabase Migrations

This folder holds SQL migration files for the project.

## How migrations work here

Migrations are **manual** — there is no Supabase CLI or auto-apply set up.  
You copy the SQL and run it in the Supabase SQL Editor.

> **Supabase SQL Editor:**  
> https://supabase.com/dashboard/project/pfumwhrukflzsrvbyyis/sql/new

## Running a migration

1. Open the file you want to run (e.g. `migrations/20260502_create_job_applications.sql`)
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run**

## Migration files

| File | Description |
|------|-------------|
| `001_create_job_applications.sql` | Creates the `job_applications` table, RLS policies, and index for the Job Application Tracker feature |

Each new migration increments the prefix: `002_...`, `003_...`, and so on.

## Want automatic migrations instead?

Install the Supabase CLI (`npm install supabase --save-dev`) and run:

```bash
npx supabase link --project-ref pfumwhrukflzsrvbyyis
npx supabase db push
```

This will apply all files in `migrations/` automatically against your linked project.
