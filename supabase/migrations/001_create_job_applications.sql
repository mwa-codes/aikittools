-- Migration: create job_applications table for Job Application Tracker
-- Run this in the Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/pfumwhrukflzsrvbyyis/sql/new

-- 1. Create the table
CREATE TABLE IF NOT EXISTS job_applications (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  company      text        NOT NULL,
  role         text        NOT NULL,
  job_url      text,
  date_applied date        NOT NULL DEFAULT CURRENT_DATE,
  status       text        NOT NULL DEFAULT 'Applied',
  notes        text,
  priority     text        NOT NULL DEFAULT 'Normal',
  created_at   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT valid_status   CHECK (status   IN ('Applied', 'Interview', 'Offer', 'Rejected', 'Ghosted')),
  CONSTRAINT valid_priority CHECK (priority IN ('High', 'Normal'))
);

-- 2. Index for fast per-user lookups
CREATE INDEX IF NOT EXISTS job_applications_user_id_idx
  ON job_applications (user_id);

-- 3. Enable Row Level Security (users can only see/edit their own rows)
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- 4. RLS policy: one policy covers SELECT, INSERT, UPDATE, DELETE
CREATE POLICY "Users manage their own applications"
  ON job_applications
  FOR ALL
  USING     (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
