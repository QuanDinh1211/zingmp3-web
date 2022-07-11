export const albumReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'album/ADD_ALBUM':
            return {
                ...state,
                albums: [...payload]
            }
        case 'album/SET_ALBUM':
            return {
                ...state,
                album: payload
            }
        case 'album/ADD_SONG_ALBUM':
            return {
                ...state,
                songs: [...payload]
            }
        default:
            return state
    }
}