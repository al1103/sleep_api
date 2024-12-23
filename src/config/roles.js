const ROLE_KEYS = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

const ROLE_RIGHT_KEYS = Object.freeze({
  GET_USERS: 'getUsers',
  MANAGE_USERS: 'manageUsers',
});

const rolePermissions = {
  [ROLE_KEYS.USER]: [],
  [ROLE_KEYS.ADMIN]: Object.values(ROLE_RIGHT_KEYS),
};

const roles = Object.keys(rolePermissions);
const roleRights = new Map(Object.entries(rolePermissions));

export { ROLE_KEYS, ROLE_RIGHT_KEYS, roleRights, roles };
