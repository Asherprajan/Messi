const initialState = {
    admin: null,
    isAdmin: false,
    isAuthenticated: false,
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
   
      case 'SET_ADMIN':
        return { ...state, admin: action.payload, isAuthenticated: true };     
        
      case 'LOGOUT_ADMIN':
        return { ...state, admin: null, isAuthenticated: false };
        default:
        return state;
    }
  };
  
  export default adminReducer;
  
  
  