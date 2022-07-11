import { ToastContainer } from 'react-toastify'

import './style/home.scss'
import Menu from './components/menu'
import Footer from './components/footer/Footer'
import Content from './components/contents'

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Menu />
                <Content />
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
