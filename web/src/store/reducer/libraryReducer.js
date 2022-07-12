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
        case 'library/ADD_LIBRARYAUTHOR':
            return {
                ...state,
                authors: [...payload]
            }
        case 'library/ADD_LIBRARYSTORY':
            return {
                ...state,
                storys: [...payload]
            }
        case 'library/ADD_LIBRARYITEMALBUM':
            return {
                ...state,
                albums: [...state.albums, payload]
            }
        case 'library/ADD_LIBRARYITEMSONG':
            return {
                ...state,
                songs: [...state.songs, payload]
            }
        case 'library/ADD_LIBRARYITEMPLAYLIST':
            return {
                ...state,
                playlists: [...state.playlists, payload]
            }
        case 'library/ADD_LIBRARYITEMAUTHOR':
            return {
                ...state,
                authors: [...state.albums, payload]
            }
        case 'library/ADD_LIBRARYITEMSTORY':
            return {
                ...state,
                storys: [...state.storys, payload]
            }
        case 'library/CREATE_LIBRARYPLAYLIST':
            return {
                ...state,
                library: [...state.library, payload]
            }
        case 'library/DELETE_LIBRARY':
            return {
                ...state,
                library: state.library.filter((library) => library !== payload)
            }
        case 'library/DELETE_LIBRARYSONG':
            return {
                ...state,
                songs: state.songs.filter((library) => library !== payload)
            }
        case 'library/DELETE_LIBRARYALBUM':
            return {
                ...state,
                albums: state.albums.filter((library) => library !== payload)
            }
        case 'library/DELETE_LIBRARYPLAYLIST':
            return {
                ...state,
                playlists: state.playlists.filter((library) => library !== payload)
            }
        case 'library/DELETE_LIBRARYAUTHOR':
            return {
                ...state,
                authors: state.authors.filter((library) => library !== payload)
            }
        case 'library/DELETE_LIBRARYSTORY':
            return {
                ...state,
                storys: state.storys.filter((library) => library !== payload)
            }
        default:
            return state
    }
}