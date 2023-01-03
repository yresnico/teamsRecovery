import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Orders from './components/Orders';
import SignUp from './components/SignUp';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
