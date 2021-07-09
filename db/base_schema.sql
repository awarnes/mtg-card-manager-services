-- TABLE DEFINITIONS
-- Patch history table
CREATE TABLE IF NOT EXISTS patch_history (
  filename TEXT PRIMARY KEY,
  created TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cards Table
CREATE TABLE IF NOT EXISTS cards_atomic (
  card_id SERIAL PRIMARY KEY,
  ascii_name TEXT NULL,
  white BOOLEAN NOT NULL,
  blue BOOLEAN NOT NULL,
  black BOOLEAN NOT NULL,
  red BOOLEAN NOT NULL,
  green BOOLEAN NOT NULL,
  colorless BOOLEAN NOT NULL,
  converted_mana_cost REAL NOT NULL,
  edhrec_rank INTEGER NULL,
  face_converted_mana_cost REAL NULL,
  face_name TEXT NULL,
  hand TEXT NULL,
  has_alternative_deck_limit BOOLEAN NULL,
  is_reserved BOOLEAN NULL,
  keywords TEXT NULL,
  layout TEXT NOT NULL,
  leadership_brawl BOOLEAN NULL,
  leadership_commander BOOLEAN NULL,
  leadership_oathbreaker BOOLEAN NULL,
  legalities JSONB NOT NULL,
  life INTEGER NULL,
  loyalty INTEGER NULL,
  mana_cost TEXT NULL,
  "name" TEXT NOT NULL,
  power TEXT NULL,
  rulings JSONB NOT NULL,
  scryfall_illustration_id TEXT NOT NULL,
  scryfall_oracle_id TEXT NOT NULL,
  side TEXT NULL,
  subtypes TEXT NOT NULL,
  supertypes TEXT NOT NULL,
  "text" TEXT NULL,
  toughness TEXT NULL,
  "type" TEXT NOT NULL,
  types TEXT NOT NULL
)