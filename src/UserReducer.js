export const UserReducer = (state, action) => {

    switch (action.type) {
        case "SET_USER":
            return {...state, user:action.payload.userFromDB, token:action.payload.token, isUserAuthenticated:true}
        
        case "LOGOUT_USER":
            return{
                ...state, user:"", token:"", isUserAuthenticated:false
            }
    
        default:
            return state
    }
}