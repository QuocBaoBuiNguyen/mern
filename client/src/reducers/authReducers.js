// Xem react hub 5 tang, context, reducer..... video

export const authReducer = (state, action) => {
    const {
        type,
         payload: {isAuthenticated, user}
    } = action

    switch(type) {
        case 'SET_AUTH':
            console.log("In reducder check authenticated:",isAuthenticated)

            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        
        default:
            return state
    }

}
