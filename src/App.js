import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Footer from './Footer';


function App() {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg '>
        <h2 className='ms-5'>Currency Convertor</h2>
      </nav>
      <Route path="/" component={Home} />
      <Footer />
    </Router>
    
  );
}

export default App;
