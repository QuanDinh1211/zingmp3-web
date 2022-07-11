export const userReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action

    switch (type) {
        case 'user/SET_USER':
            return {
                ...state,
                isAuthenticated,
                user
            }

        default:
            return state
    }
}