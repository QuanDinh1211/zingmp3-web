import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import UserContextProvider from './store/contexts/userContext'
import PlaylistContextProvider from './store/contexts/playlistContext'
import AlbumContextProvider from './store/contexts/albumContext'
import SongContextProvider from './store/contexts/songContext'
import AuthorContextProvider from './store/contexts/authorContext'
import StoryContextProvider from './store/contexts/storyContext'
import LibraryContextProvider from './store/contexts/libraryContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <PlaylistContextProvider>
                <AlbumContextProvider>
                    <SongContextProvider>
                        <AuthorContextProvider>
                            <StoryContextProvider>
                                <LibraryContextProvider>
                                    <Router>
                                        <App />
                                    </Router>
                                </LibraryContextProvider>
                            </StoryContextProvider>
                        </AuthorContextProvider>
                    </SongContextProvider>
                </AlbumContextProvider>
            </PlaylistContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
