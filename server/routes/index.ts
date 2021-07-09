import testDbConnection from './testDbConnection';
import getEquipment from './getEquipment';
import getAllEquipment from './getAllEquipment';
import authUser from './auth/authUser';

const routes = [testDbConnection, getEquipment, getAllEquipment, authUser];

export default routes;
