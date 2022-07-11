export const playlistReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'playlist/ADD_PLAYLIST':
            return {
                ...state,
                playlists: [...payload]
            }
        case 'playlist/SET_PLAYLIST':
            return {
                ...state,
                playlist: payload
            }
        case 'playlist/ADD_SONG_PLAYLIST':
            return {
                ...state,
                songs: [...payload]
            }
        default:
            return state
    }
}