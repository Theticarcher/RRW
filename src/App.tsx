import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import logo from './logo.svg';
import './styling/style.sass';
import { Navbar } from './components/misc/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import EventsPage from './pages/EventsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (

    <Router>
      <Navbar/>
      <div className='page-content'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/events' element={<EventsPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
