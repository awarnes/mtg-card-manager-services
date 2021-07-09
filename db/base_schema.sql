-- TYPE DEFINITIONS
-- Fermentable Enumerations
DO $$ BEGIN
  CREATE TYPE fermentable_type_enum AS ENUM (
    'GRAIN',
    'SUGAR',
    'EXTRACT',
    'DRY_EXTRACT',
    'ADJUNCT'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Hops Enumerations
DO $$ BEGIN
  CREATE TYPE hops_use AS ENUM (
    'BOIL',
    'DRY_HOP',
    'MASH',
    'FIRST_WORT',
    'AROMA'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE hops_type AS ENUM (
    'BITTERING',
    'AROMA',
    'BOTH'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE hops_form AS ENUM (
    'PELLET',
    'PLUG',
    'LEAF'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Mash Step Enumerations
DO $$ BEGIN
  CREATE TYPE mash_step_type AS ENUM (
    'INFUSION',
    'TEMPERATURE',
    'DECOCTION'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Misc Enumerations
DO $$ BEGIN
  CREATE TYPE misc_type AS ENUM (
    'SPICE',
    'FINING',
    'WATER_AGENT',
    'HERB',
    'FLAVOR',
    'OTHER'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE misc_use AS ENUM (
    'BOIL',
    'MASH',
    'PRIMARY',
    'SECONDARY',
    'BOTTLING'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Recipe Enumerations
DO $$ BEGIN
  CREATE TYPE recipe_type AS ENUM (
    'EXTRACT',
    'PARTIAL_MASH',
    'ALL GRAIN'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Style Enumerations
DO $$ BEGIN
  CREATE TYPE style_type AS ENUM (
    'LAGER',
    'ALE',
    'MEAD',
    'WHEAT',
    'MIXED',
    'CIDER'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Yeast Enumerations
DO $$ BEGIN
  CREATE TYPE yeast_type AS ENUM (
    'ALE',
    'LAGER',
    'WHEAT',
    'WINE',
    'CHAMPAGNE'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE yeast_form AS ENUM (
    'LIQUID',
    'DRY',
    'SLANT',
    'CULTURE'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE flocculation_type AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'VERY_HIGH'
  );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- TABLES:
-- Patch history table
CREATE TABLE IF NOT EXISTS patch_history (
  filename TEXT PRIMARY KEY,
  created TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Equipment Table
CREATE TABLE IF NOT EXISTS equipment (
  equipment_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  boil_size REAL NOT NULL,
  batch_size REAL NOT NULL,
  tun_volume REAL NULL,
  tun_weight REAL NULL,
  tun_specific_heat REAL NULL,
  top_up_water REAL NULL,
  trub_chiller_loss REAL NULL,
  evap_rate REAL NULL
    CHECK(evap_rate >= 0 and evap_rate <= 100),
  boil_time INTEGER NULL,
  calc_boil_volume BOOLEAN NULL,
  lauter_deadspace REAL NULL,
  top_up_kettle REAL NULL,
  hop_utilitization REAL NULL
    CHECK(hop_utilitization >= 0 and hop_utilitization <= 100),
  notes TEXT NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Fermentable Table
CREATE TABLE IF NOT EXISTS fermentable (
  fermentable_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  fermentable_type fermentable_type_enum NOT NULL,
  amount REAL NOT NULL,
  yield REAL NOT NULL
    CHECK(yield >= 0 and yield <= 100),
  color REAL NOT NULL,
  add_after_boil BOOLEAN NULL,
  origin TEXT NULL,
  supplier TEXT NULL,
  notes TEXT NULL,
  coarse_fine_diff REAL NULL
    CHECK(coarse_fine_diff >= 0 and coarse_fine_diff <= 100),
  moisture REAL NULL
    CHECK(moisture >= 0 and moisture <= 100),
  diastatic_power REAL NULL,
  protein REAL NULL
    CHECK(protein >= 0 and protein <= 100),
  max_in_batch REAL NULL
    CHECK(max_in_batch >= 0 and max_in_batch <= 100),
  recommend_mash BOOLEAN NULL,
  ibu_gal_per_lb REAL NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Hops Table
CREATE TABLE IF NOT EXISTS hops (
  hops_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  alpha REAL NOT NULL
    CHECK(alpha >= 0 and alpha <= 100),
  amount REAL NOT NULL,
  "use" hops_use NOT NULL,
  "time" REAL NOT NULL,
  notes TEXT NULL,
  "type" hops_type NULL,
  form hops_form NULL,
  beta REAL NULL
    CHECK(beta >= 0 and beta <= 100),
  hsi REAL NULL
    CHECK(hsi >= 0 and hsi <= 100),
  origin TEXT NULL,
  substitutes TEXT NULL,
  humulene REAL NULL
    CHECK(humulene >= 0 and humulene <= 100),
  caryophyllene REAL NULL
    CHECK(caryophyllene >= 0 and caryophyllene <= 100),
  cohumulone REAL NULL
    CHECK(cohumulone >= 0 and cohumulone <= 100),
  myrcene REAL NULL
    CHECK(myrcene >= 0 and myrcene <= 100),
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Mash Profile Table
CREATE TABLE IF NOT EXISTS mash_profile (
  mash_profile_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  grain_temp REAL NOT NULL,
  notes TEXT NULL,
  tun_temp REAL NULL,
  sparge_temp REAL NULL,
  ph REAL NULL,
  tun_weight REAL NULL,
  tun_specific_heat REAL NULL,
  equip_adjust BOOLEAN NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Mash Step Table
CREATE TABLE IF NOT EXISTS mash_step (
  mash_step_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  mash_profile_id INTEGER REFERENCES mash_profile(mash_profile_id)
    ON DELETE CASCADE,
  "type" mash_step_type NOT NULL,
  infuse_amount REAL NULL,
  step_temp REAL NOT NULL,
  step_time REAL NOT NULL,
  ramp_time REAL NULL,
  end_temp REAL NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Misc Table
CREATE TABLE IF NOT EXISTS misc_ingredient (
  misc_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "type" misc_type NOT NULL,
  "use" misc_use NOT NULL,
  "time" REAL NOT NULL,
  amount REAL NOT NULL,
  amount_is_weight BOOLEAN NULL,
  use_for TEXT NULL,
  notes TEXT NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Style Table
CREATE TABLE IF NOT EXISTS style (
  style_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  category TEXT NOT NULL,
  category_number TEXT NOT NULL,
  style_letter TEXT NOT NULL,
  style_guide TEXT NOT NULL,
  "type" style_type NOT NULL,
  og_min REAL NOT NULL,
  og_max REAL NOT NULL,
  fg_min REAL NOT NULL,
  fg_max REAL NOT NULL,
  ibu_min INTEGER NOT NULL,
  ibu_max INTEGER NOT NULL,
  color_min REAL NOT NULL,
  color_max REAL NOT NULL,
  carb_min REAL NULL,
  carb_max REAL NULL,
  abv_min REAL NULL
    CHECK (abv_min >= 0 and abv_min <= 100),
  abv_max REAL NULL
    CHECK (abv_max >= 0 and abv_max <= 100),
  notes TEXT NULL,
  "profile" TEXT NULL,
  ingredients TEXT NULL,
  examples TEXT NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Recipe Table
CREATE TABLE IF NOT EXISTS recipe (
  recipe_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "type" recipe_type NOT NULL,
  style_id INTEGER REFERENCES style(style_id)
    ON DELETE SET NULL,
  brewer TEXT NOT NULL,
  asst_brewer TEXT NOT NULL,
  batch_size REAL NOT NULL,
  boil_size REAL NOT NULL,
  boil_time REAL NOT NULL,
  efficiency REAL NULL
    CHECK(efficiency >= 0 and efficiency <= 100),
  notes TEXT NULL,
  taste_notes TEXT NULL,
  taste_rating REAL NULL
    CHECK(taste_rating >= 0.0 and taste_rating <= 50.0),
  og REAL NULL,
  fg REAL NULL,
  fermentation_stages INTEGER NULL,
  primary_age REAL NULL,
  primary_temp REAL NULL,
  secondary_age REAL NULL,
  secondary_temp REAL NULL,
  tertiary_age REAL NULL,
  tertiary_temp REAL NULL,
  age REAL NULL,
  age_temp REAL NULL,
  "date" TIMESTAMPTZ NULL,
  carbonation REAL NULL,
  forced_carbonation BOOLEAN NULL,
  priming_sugar_name TEXT NULL,
  cabonation_temp REAL NULL,
  priming_sugar_equiv REAL NULL,
  keg_priming_factor REAL NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Water Table
CREATE TABLE IF NOT EXISTS water (
  water_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  amount REAL NOT NULL,
  calcium REAL NOT NULL,
  bicarbonate REAL NOT NULL,
  sulfate REAL NOT NULL,
  chloride REAL NOT NULL,
  sodium REAL NOT NULL,
  magnesium REAL NOT NULL,
  ph REAL NULL,
  notes TEXT NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Yeast Table
CREATE TABLE IF NOT EXISTS yeast (
  yeast_id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "type" yeast_type NOT NULL,
  form yeast_form NOT NULL,
  amount REAL NOT NULL,
  amount_is_weight BOOLEAN NULL,
  laboratory TEXT NULL,
  product_id TEXT NULL,
  min_temperature REAL NULL,
  max_temperature REAL NULL,
  flocculation flocculation_type NULL,
  attenuation REAL NULL
    CHECK (attenuation >= 0 and attenuation <= 100),
  notes TEXT NULL,
  best_for TEXT NULL,
  times_cultured INTEGER NULL,
  max_reuse INTEGER NULL,
  add_to_secondary BOOLEAN NULL,
  updated TIMESTAMPTZ NULL DEFAULT now(),
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("name", "version")
);

-- Many To Many Join Tables

-- Recipe-Equipment
CREATE TABLE IF NOT EXISTS recipe_equipment (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  equipment_id INTEGER REFERENCES equipment(equipment_id)
    ON DELETE CASCADE
);

-- Recipe-Hops
CREATE TABLE IF NOT EXISTS recipe_hops (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  hops_id INTEGER REFERENCES hops(hops_id)
    ON DELETE CASCADE
);

-- Recipe-Fermentable
CREATE TABLE IF NOT EXISTS recipe_fermentable (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  fermentable_id INTEGER REFERENCES fermentable(fermentable_id)
    ON DELETE CASCADE
);

-- Recipe-MiscIngredient
CREATE TABLE IF NOT EXISTS recipe_misc_ingredient (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  misc_id INTEGER REFERENCES misc_ingredient(misc_id)
    ON DELETE CASCADE
);

-- Recipe-Yeast
CREATE TABLE IF NOT EXISTS recipe_yeast (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  yeast_id INTEGER REFERENCES yeast(yeast_id)
    ON DELETE CASCADE
);

-- Recipe-Water
CREATE TABLE IF NOT EXISTS recipe_water (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  water_id INTEGER REFERENCES water(water_id)
    ON DELETE CASCADE
);

-- Recipe-MashProfile
CREATE TABLE IF NOT EXISTS recipe_mash_profile (
  recipe_id INTEGER REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
  mash_profile_id INTEGER REFERENCES mash_profile(mash_profile_id)
    ON DELETE CASCADE
);