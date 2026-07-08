-- =====================================================================
-- SUPABASE MIGRATION & SETUP SQL CODE
-- =====================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com -> Project -> SQL Editor -> New Query

-- ---------------------------------------------------------------------
-- 1. ALTER existing 'alumni_responses' table to add missing columns
-- ---------------------------------------------------------------------
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS registration_id TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS country_code TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS residence_place TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS subject_area TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS additional_degrees TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS highest_achievement TEXT;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS pg_student BOOLEAN DEFAULT FALSE;
ALTER TABLE IF EXISTS alumni_responses ADD COLUMN IF NOT EXISTS coordinator TEXT;

-- ---------------------------------------------------------------------
-- 2. CREATE tables from scratch if they do not exist
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alumni_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT UNIQUE,
    full_name TEXT NOT NULL,
    mobile TEXT UNIQUE NOT NULL,
    country_code TEXT NOT NULL,
    email TEXT,
    residence_place TEXT,
    country TEXT, -- Holds District or State
    dob DATE,
    photo_url TEXT,
    admission_year INTEGER,
    leaving_year INTEGER,
    alumni_status TEXT,
    qualification TEXT,
    subject_area TEXT,
    additional_degrees TEXT,
    highest_achievement TEXT,
    profession TEXT,
    organization TEXT,
    field_of_work TEXT,
    work_location TEXT,
    annual_income TEXT,
    pg_student BOOLEAN DEFAULT FALSE,
    skills TEXT[],
    engagement TEXT,
    directory_include BOOLEAN DEFAULT FALSE,
    whatsapp_join TEXT,
    region TEXT,
    coordinator TEXT,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    batch TEXT NOT NULL,
    mobile TEXT NOT NULL,
    payment_proof_url TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------------------
-- 3. ENABLE Row Level Security (RLS) on all tables
-- ---------------------------------------------------------------------
ALTER TABLE alumni_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------
-- 4. CREATE Row Level Security (RLS) policies for anonymous operations
-- ---------------------------------------------------------------------

-- Policies for alumni_responses
DROP POLICY IF EXISTS "Allow public select alumni" ON alumni_responses;
DROP POLICY IF EXISTS "Allow public insert alumni" ON alumni_responses;
DROP POLICY IF EXISTS "Allow public update alumni" ON alumni_responses;
DROP POLICY IF EXISTS "Allow public delete alumni" ON alumni_responses;

CREATE POLICY "Allow public select alumni" ON alumni_responses FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert alumni" ON alumni_responses FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public update alumni" ON alumni_responses FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete alumni" ON alumni_responses FOR DELETE TO anon USING (true);

-- Policies for membership
DROP POLICY IF EXISTS "Allow public select membership" ON membership;
DROP POLICY IF EXISTS "Allow public insert membership" ON membership;
DROP POLICY IF EXISTS "Allow public delete membership" ON membership;

CREATE POLICY "Allow public select membership" ON membership FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert membership" ON membership FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public delete membership" ON membership FOR DELETE TO anon USING (true);

-- Policies for batches
DROP POLICY IF EXISTS "Allow public select batches" ON batches;
DROP POLICY IF EXISTS "Allow public insert batches" ON batches;
DROP POLICY IF EXISTS "Allow public delete batches" ON batches;

CREATE POLICY "Allow public select batches" ON batches FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert batches" ON batches FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public delete batches" ON batches FOR DELETE TO anon USING (true);
