import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import ChartPage from './ChartPage';
import Footer from './Footer';


function App() {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg '>
        <h2 className='ms-5'><Link to="/">Currency Convertor</Link></h2>
        <h4><Link to="/chart/">Chart</Link></h4>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/chart/" component={ChartPage} />
      <Footer />
    </Router>
    
  );
}

export default App;
