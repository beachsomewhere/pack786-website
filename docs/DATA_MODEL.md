# Data Model

TypeScript shapes live in `types/index.ts`. Below is the equivalent Supabase
(Postgres) schema for phase 2, with Row Level Security notes. Public tables
are readable by anyone; private tables are admin/service-role only.

```sql
-- PUBLIC: readable by anyone, writable only by authenticated admins
create table events (
  slug text primary key,
  name text not null,
  category text not null,
  program_year text not null,
  status text not null,
  event_date date,
  date_label text,
  start_time text,
  end_time text,
  location text,
  address text,
  map_url text,
  description text,
  audience text,
  den text,
  registration_link text,
  registration_deadline date,
  capacity int,
  cost text,
  organizer text,
  volunteer_needs text,
  packing_list text[],
  meal_details text,
  weather_notes text,
  accessibility_notes text,
  required_forms text[],
  notes text,
  featured boolean default false,
  confirmed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table events enable row level security;
create policy "events are publicly readable" on events for select using (true);
create policy "only admins can write events" on events for all
  using (auth.jwt() ->> 'role' in ('site_admin','pack_leader','event_coordinator'));

-- PRIVATE: admin/service-role only. Contains children's names/ages, medical info.
create table event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text references events(slug),
  family_name text not null,
  guardian_name text not null,
  guardian_email text not null,
  guardian_phone text,
  attending_adults text[],
  attending_children jsonb, -- [{name, age, den}]
  den text,
  total_attending int,
  dietary_restrictions text,
  allergies text,
  emergency_contact jsonb, -- {name, phone, relationship}
  volunteer_interest text,
  items_bringing text,
  payment_status text default 'Not Required',
  internal_notes text,
  submitted_at timestamptz default now()
);
alter table event_registrations enable row level security;
create policy "registrations are admin-only" on event_registrations for all
  using (auth.jwt() ->> 'role' in ('site_admin','pack_leader','event_coordinator'));
-- No public select policy is created on this table, intentionally.

create table recruitment_inquiries (
  id uuid primary key default gen_random_uuid(),
  guardian_name text not null,
  email text not null,
  phone text,
  child_name text,
  child_grade text,
  child_school text,
  preferred_contact text,
  message text,
  consent_to_contact boolean not null,
  submitted_at timestamptz default now(),
  status text default 'New'
);
alter table recruitment_inquiries enable row level security;
create policy "inquiries are admin-only" on recruitment_inquiries for all
  using (auth.jwt() ->> 'role' in ('site_admin','pack_leader'));

create table volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  child_den text,
  areas_of_interest text[],
  availability text,
  skills text,
  interested_in_leadership boolean default false,
  submitted_at timestamptz default now()
);
alter table volunteer_signups enable row level security;
create policy "volunteer signups are admin-only" on volunteer_signups for all
  using (auth.jwt() ->> 'role' in ('site_admin','pack_leader'));

-- PUBLIC content tables
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  category text,
  summary text,
  body text,
  expiration_date date,
  link text,
  urgent boolean default false
);
alter table announcements enable row level security;
create policy "announcements are publicly readable" on announcements for select
  using (expiration_date is null or expiration_date >= current_date);
create policy "only admins can write announcements" on announcements for all
  using (auth.jwt() ->> 'role' in ('site_admin','pack_leader'));

create table documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  file_url text not null,
  updated_at timestamptz default now(),
  archived boolean default false
);
alter table documents enable row level security;
create policy "non-archived documents are publicly readable" on documents for select
  using (archived = false);
create policy "only admins can manage documents" on documents for all
  using (auth.jwt() ->> 'role' in ('site_admin','pack_leader'));
```

## Admin roles
Role is stored as a custom claim on the Supabase Auth user (or a separate
`admin_users` table joined at login):

| Role | Access |
|---|---|
| Site Administrator | Everything: users/roles, all content, all exports, settings |
| Pack Leader | Events, announcements, documents, gallery, recruitment inquiries, volunteers |
| Event Coordinator | Registrations + volunteer assignments for events they're assigned to |

## Public vs. private, at a glance
- **Public**: events, announcements, documents (non-archived), gallery photos, recruitment/volunteer/contact *forms* (write-only from the public side).
- **Private**: registration records, recruitment inquiries, volunteer signups, emergency contacts, medical/dietary info, internal planning notes. None of these have a public `select` policy.
