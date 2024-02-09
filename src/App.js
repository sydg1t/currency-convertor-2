import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home'


function App() {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg border-bottom shadow'>
        <h2 className='ms-5'>Currency Convertor</h2>
      </nav>
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
