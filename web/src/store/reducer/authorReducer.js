export const authorReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'author/GET_LIST_AUTHOR':
            return {
                ...state,
                authors: [...payload]
            }
        case 'author/SET_AUTHOR':
            return {
                ...state,
                author: payload
            }
        default:
            return state
    }
}