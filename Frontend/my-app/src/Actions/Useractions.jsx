export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

// Action creator to set the user data
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Action creator for logout (if needed)
export const logout = () => ({
  type: LOGOUT,
});


