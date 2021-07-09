import testDbConnection from './testDbConnection';
import getEquipment from './getEquipment';
import getAllEquipment from './getAllEquipment';
import getFermentable from './getFermentable';
import getAllFermentables from './getAllFermentables';
import getHops from './getHops';
import getAllHops from './getAllHops';
import getMashProfile from './getMashProfile';
import getAllMashProfiles from './getAllMashProfiles';
import getMashStep from './getMashStep';
import getAllMashSteps from './getAllMashSteps';
import getMiscIngredient from './getAllMiscIngredients';
import getAllMiscIngredients from './getAllMiscIngredients';
import getRecipe from './getRecipe';
import getAllRecipes from './getAllRecipes';
import getStyle from './getStyle';
import getAllStyles from './getAllStyles';
import getWater from './getWater';
import getAllWater from './getAllWater';
import getYeast from './getYeast';
import getAllYeast from './getAllYeast';

const routes = [
  testDbConnection,
  getEquipment,
  getAllEquipment,
  getFermentable,
  getAllFermentables,
  getHops,
  getAllHops,
  getMashProfile,
  getAllMashProfiles,
  getMashStep,
  getAllMashSteps,
  getMiscIngredient,
  getAllMiscIngredients,
  getRecipe,
  getAllRecipes,
  getStyle,
  getAllStyles,
  getWater,
  getAllWater,
  getYeast,
  getAllYeast
];

export default routes;
