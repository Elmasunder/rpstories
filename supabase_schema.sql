-- =====================================================================
-- DATABASE INITIALIZATION FOR RPSTORIES
-- Paste this script into the Supabase SQL Editor and click "Run".
-- =====================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. TABLE: characters
CREATE TABLE IF NOT EXISTS public.characters (
    id TEXT PRIMARY KEY, -- ex: "amari_davis"
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    privacy TEXT NOT NULL CHECK (privacy IN ('public', 'followers', 'private')) DEFAULT 'public',
    
    -- Cover Fields
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    alias TEXT,
    status TEXT NOT NULL CHECK (status IN ('alive', 'dead')),
    server_domain TEXT NOT NULL,
    discord_url TEXT,
    eyebrow TEXT NOT NULL,
    ref TEXT NOT NULL,
    photos TEXT[] NOT NULL,
    
    -- Cover Meta
    age INTEGER NOT NULL,
    taille TEXT NOT NULL,
    poids TEXT NOT NULL,
    origines TEXT NOT NULL,
    vehicule_ref TEXT NOT NULL,
    
    -- Structured chapters (JSONB)
    chapter1 JSONB NOT NULL,
    chapter2 JSONB NOT NULL,
    chapter3 JSONB NOT NULL,
    chapter4 JSONB, -- Optional
    chapter5 JSONB, -- Optional
    chapter6 JSONB NOT NULL,
    family JSONB, -- Optional
    footer TEXT NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on characters
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

-- 3. TABLE: follows (Unilateral follows system)
CREATE TABLE IF NOT EXISTS public.follows (
    follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    CONSTRAINT no_self_follow CHECK (follower_id <> following_id)
);

-- Enable RLS on follows
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;


-- =====================================================================
-- 4. PROFILE AUTOMATIC CREATION TRIGGER
-- =====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, username, avatar_url)
    VALUES (
        new.id,
        COALESCE(
            new.raw_user_meta_data->>'name',
            new.raw_user_meta_data->>'full_name',
            new.raw_user_meta_data->>'user_name',
            split_part(new.email, '@', 1)
        ),
        COALESCE(
            new.raw_user_meta_data->>'avatar_url',
            new.raw_user_meta_data->>'picture'
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =====================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Follows Policies
CREATE POLICY "Anyone can view follows" 
    ON public.follows FOR SELECT 
    USING (true);

CREATE POLICY "Users can follow others" 
    ON public.follows FOR INSERT 
    WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow others" 
    ON public.follows FOR DELETE 
    USING (auth.uid() = follower_id);

-- Characters Policies
CREATE POLICY "Users can insert their own characters" 
    ON public.characters FOR INSERT 
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own characters" 
    ON public.characters FOR UPDATE 
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own characters" 
    ON public.characters FOR DELETE 
    USING (auth.uid() = owner_id);

CREATE POLICY "View characters based on privacy rules" 
    ON public.characters FOR SELECT 
    USING (
        privacy = 'public'
        OR owner_id = auth.uid()
        OR (
            privacy = 'followers'
            AND EXISTS (
                SELECT 1 FROM public.follows
                WHERE follower_id = auth.uid()
                AND following_id = owner_id
            )
        )
    );
