export const storyReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'story/ADD_STORY':
            return {
                ...state,
                storys: [...payload]
            }
        // case 'album/SET_ALBUM':
        //     return {
        //         ...state,
        //         album: payload
        //     }
        // case 'album/ADD_SONG_ALBUM':
        //     return {
        //         ...state,
        //         songs: [...payload]
        //     }
        default:
            return state
    }
}