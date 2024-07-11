import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { useSelector } from 'react-redux'

const Layout = () => {
    const { token } = useSelector((state) => state.auth)
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={token ? <Navigate to="/home" /> : <Login />}
                />
                <Route
                    path="/home"
                    element={token ? <Home /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    )
}

export default Layout