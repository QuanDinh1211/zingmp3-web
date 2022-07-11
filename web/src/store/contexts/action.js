// user
export const SET_USER = (data) => {
    return {
        type: 'user/SET_USER',
        payload: data
    }
}


// playlist 

export const ADD_PLAYLIST = (data) => {
    return {
        type: 'playlist/ADD_PLAYLIST',
        payload: data
    }
}

export const SET_PLAYLIST = (data) => {
    return {
        type: 'playlist/SET_PLAYLIST',
        payload: data
    }
}


export const ADD_SONG_PLAYLIST = (data) => {
    return {
        type: 'playlist/ADD_SONG_PLAYLIST',
        payload: data
    }
}

// Album

export const ADD_ALBUM = (data) => {
    return {
        type: 'album/ADD_ALBUM',
        payload: data
    }
}

export const SET_ALBUM = (data) => {
    return {
        type: 'album/SET_ALBUM',
        payload: data
    }
}

export const ADD_SONG_ALBUM = (data) => {
    return {
        type: 'album/ADD_SONG_ALBUM',
        payload: data
    }
}


//song 

export const ADD_SONG = (data) => {
    return {
        type: 'song/ADD_SONG',
        payload: data
    }
}


export const GET_SONG = (data) => {
    return {
        type: 'song/GET_SONG',
        payload: data
    }
}


// author
export const GET_LIST_AUTHOR = (data) => {
    return {
        type: 'author/GET_LIST_AUTHOR',
        payload: data
    }
}

export const SET_AUTHOR = (data) => {
    return {
        type: 'author/SET_AUTHOR',
        payload: data
    }
}

// story

export const ADD_STORY = (data) => {
    return {
        type: 'story/ADD_STORY',
        payload: data
    }
}


// library

export const ADD_LIBRARY = (data) => {
    const payload = data.map((library) => {
        return library.product
    })
    return {
        type: 'library/ADD_LIBRARY',
        payload: payload
    }
}

export const ADD_LIBRARYALBUM = (data) => {
    const payload = data.map((library) => {
        return library.product
    })
    return {
        type: 'library/ADD_LIBRARYALBUM',
        payload: payload
    }
}

export const ADD_LIBRARYSONG = (data) => {
    const payload = data.map((library) => {
        return library.product
    })
    return {
        type: 'library/ADD_LIBRARYSONG',
        payload: payload
    }
}

export const ADD_LIBRARYPLAYLIST = (data) => {
    const payload = data.map((library) => {
        return library.product
    })
    return {
        type: 'library/ADD_LIBRARYPLAYLIST',
        payload: payload
    }
}

export const CREATE_LIBRARYPLAYLIST = (data) => {
    return {
        type: 'library/CREATE_LIBRARYPLAYLIST',
        payload: data.product
    }
}


export const DELETE_LIBRARYPLAYLIST = (data) => {
    return {
        type: 'library/DELETE_LIBRARYPLAYLIST',
        payload: data.product
    }
}