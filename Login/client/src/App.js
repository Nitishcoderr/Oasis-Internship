import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Register from './components/Register';
import Log from './components/Log';
import './style/index.css'
import User from './components/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Log/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/' element={<User/>} />
      </Routes>

    </Router>
  );
}

export default App;
