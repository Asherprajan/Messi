export const SET_ADMIN = 'SET_ADMIN';
export const LOGOUT_ADMIN = 'LOGOUT_ADMIN';

export const setAdmin = (admin) => ({
  type: SET_ADMIN,
  payload: admin,
});

export const logoutAdmin = () => ({
  type: LOGOUT_ADMIN,
});
