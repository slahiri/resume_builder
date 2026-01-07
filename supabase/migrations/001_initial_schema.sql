-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Resumes table
create table if not exists public.resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  title text default 'Untitled Resume',
  data jsonb not null default '{
    "personal": {
      "name": "",
      "title": "",
      "email": "",
      "phone": "",
      "location": "",
      "linkedin": "",
      "website": ""
    },
    "experience": [],
    "education": [],
    "skills": [],
    "projects": []
  }'::jsonb,
  template text default 'modern',
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- User settings table (for LLM preferences)
create table if not exists public.user_settings (
  user_id uuid references auth.users on delete cascade primary key,
  llm_provider text default 'anthropic' check (llm_provider in ('anthropic', 'grok')),
  llm_model text default 'claude-sonnet-4-20250514',
  theme text default 'system' check (theme in ('light', 'dark', 'system')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Chat history table (for resume building conversations)
create table if not exists public.chat_history (
  id uuid primary key default uuid_generate_v4(),
  resume_id uuid references public.resumes on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.user_settings enable row level security;
alter table public.chat_history enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Resumes policies
create policy "Users can view own resumes"
  on public.resumes for select
  using (auth.uid() = user_id);

create policy "Users can insert own resumes"
  on public.resumes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own resumes"
  on public.resumes for update
  using (auth.uid() = user_id);

create policy "Users can delete own resumes"
  on public.resumes for delete
  using (auth.uid() = user_id);

-- User settings policies
create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- Chat history policies
create policy "Users can view own chat history"
  on public.chat_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own chat history"
  on public.chat_history for insert
  with check (auth.uid() = user_id);

create policy "Users can update own chat history"
  on public.chat_history for update
  using (auth.uid() = user_id);

create policy "Users can delete own chat history"
  on public.chat_history for delete
  using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );

  insert into public.user_settings (user_id)
  values (new.id);

  return new;
end;
$$;

-- Trigger to create profile on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_resumes_updated_at
  before update on public.resumes
  for each row execute procedure public.update_updated_at_column();

create trigger update_user_settings_updated_at
  before update on public.user_settings
  for each row execute procedure public.update_updated_at_column();

create trigger update_chat_history_updated_at
  before update on public.chat_history
  for each row execute procedure public.update_updated_at_column();

-- Indexes for performance
create index if not exists idx_resumes_user_id on public.resumes(user_id);
create index if not exists idx_resumes_created_at on public.resumes(created_at desc);
create index if not exists idx_chat_history_resume_id on public.chat_history(resume_id);
create index if not exists idx_chat_history_user_id on public.chat_history(user_id);
