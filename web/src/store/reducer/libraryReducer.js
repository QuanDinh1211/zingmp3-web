export const libraryReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'library/ADD_LIBRARY':
            return {
                ...state,
                library: [...state.library, ...payload]
            }
        case 'library/ADD_LIBRARYALBUM':
            return {
                ...state,
                albums: [...payload]
            }
        case 'library/ADD_LIBRARYSONG':
            return {
                ...state,
                songs: [...payload]
            }
        case 'library/ADD_LIBRARYPLAYLIST':
            return {
                ...state,
                playlists: [...payload]
            }
        case 'library/CREATE_LIBRARYPLAYLIST':
            return {
                ...state,
                library: [...state.library, payload]
            }
        case 'library/DELETE_LIBRARYPLAYLIST':
            return {
                ...state,
                library: state.library.filter((library) => library !== payload)
            }
        default:
            return state
    }
}