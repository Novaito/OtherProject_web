import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Help from './Help';
import Review from './Review';
import NotFound from './page404';
import Current from './Current';


function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/review" element={<Review />} />
                <Route path="/current" element={<Current />} />
                <Route path="/Help" element={<Help />} />
                <Route path="*" element={<NotFound />} /> {/* Page 404 */}
            </Routes>
        </Router>
    );
}

function Navigation() {
    return (
        <nav>
            <Link to="/"><p class="genos-logo">MYFINANCE</p></Link>
            <div class="nav-container">
                <div class="navbar">
                    <Link to="/current"><p>This month</p></Link>
                    <Link to="/review"><p>Review</p></Link>
                    <Link to="/Help"><p>Help</p></Link>
                </div>
            </div>
        </nav>
    );
}

export default App;
