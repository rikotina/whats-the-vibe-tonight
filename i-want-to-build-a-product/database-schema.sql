-- Production-oriented schema for What's the Vibe Tonight?
-- The current prototype uses browser localStorage; this is the next database shape.

create table places (
  id text primary key,
  name text not null,
  neighborhood text not null,
  address text,
  latitude decimal(10, 7),
  longitude decimal(10, 7),
  category text not null,
  price_level text not null check (price_level in ('low', 'medium', 'high', 'worth-it')),
  reservation_mode text not null check (reservation_mode in ('walk-in', 'book-ahead', 'special-effort')),
  english_friendly text not null default 'unknown',
  website_url text,
  instagram_url text,
  map_url text,
  status text not null default 'draft',
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table vibe_tags (
  id text primary key,
  name text not null unique,
  category text not null check (category in ('mood', 'outfit', 'social_energy', 'occasion', 'time', 'friction'))
);

create table place_vibes (
  place_id text not null references places(id) on delete cascade,
  vibe_tag_id text not null references vibe_tags(id) on delete cascade,
  strength integer not null default 3 check (strength between 1 and 5),
  primary key (place_id, vibe_tag_id)
);

create table editorial_notes (
  place_id text primary key references places(id) on delete cascade,
  one_liner text not null,
  why_go text,
  best_time_to_go text,
  what_to_order text,
  good_before text,
  good_after text,
  avoid_if text
);

create table recommendation_events (
  id bigserial primary key,
  mood text,
  neighborhood text,
  budget text,
  outfit text,
  social_energy text,
  time_window text,
  reservation_tolerance text,
  result_place_ids text[] not null,
  created_at timestamptz not null default now()
);

create table feedback (
  id bigserial primary key,
  recommendation_event_id bigint references recommendation_events(id) on delete set null,
  place_id text references places(id) on delete cascade,
  signal text not null check (signal in ('nailed-it', 'too-expensive', 'too-loud', 'too-far', 'not-my-vibe', 'closed-or-wrong')),
  note text,
  created_at timestamptz not null default now()
);
