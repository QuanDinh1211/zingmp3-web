export const songReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'song/ADD_SONG':
            return {
                ...state,
                songs: [...payload],
                song: payload[0]
            }
        case 'song/GET_SONG':
            return {
                ...state,
                song: payload
            }
        default:
            return state
    }
}