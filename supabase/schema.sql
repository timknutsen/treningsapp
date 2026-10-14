-- Treningsappens tabeller i Supabase-prosjektet den deler med Ukeoppgaver.
-- Allerede kjørt i prosjektet; ligger her i tilfelle alt må settes opp på nytt.
-- members (navn + PIN) og feedback er definert i ukeoppgaver/supabase/schema.sql.

-- Plan per medlem. updated_at er ms fra appen; nyeste plan vinner.
create table if not exists training_plans (
  member_id text primary key references members(id) on delete cascade,
  plan jsonb not null,
  updated_at bigint not null default 0
);

-- Én rad per dag med framgang. Bare dager som er endret i appen lagres;
-- urørte dager bygges fra planen. t er ms fra appen; nyeste dag vinner.
create table if not exists training_days (
  member_id text not null references members(id) on delete cascade,
  day text not null check (day ~ '^\d{4}-\d{2}-\d{2}$'),
  data jsonb not null,
  t bigint not null default 0,
  primary key (member_id, day)
);

-- Eldre versjoner fra en enhet som har vært uten nett, skal ikke overskrive nyere.
create or replace function training_keep_newest() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_table_name = 'training_days' then
    if new.t < old.t then return old; end if;
  else
    if new.updated_at < old.updated_at then return old; end if;
  end if;
  return new;
end $$;

create trigger training_days_newest before update on training_days
  for each row execute function training_keep_newest();
create trigger training_plans_newest before update on training_plans
  for each row execute function training_keep_newest();

alter table training_plans enable row level security;
alter table training_days enable row level security;

create policy "training_plans are readable"  on training_plans for select using (true);
create policy "training_plans are writable"  on training_plans for insert with check (true);
create policy "training_plans are updatable" on training_plans for update using (true);
create policy "training_plans are deletable" on training_plans for delete using (true);

create policy "training_days are readable"  on training_days for select using (true);
create policy "training_days are writable"  on training_days for insert with check (true);
create policy "training_days are updatable" on training_days for update using (true);
create policy "training_days are deletable" on training_days for delete using (true);
