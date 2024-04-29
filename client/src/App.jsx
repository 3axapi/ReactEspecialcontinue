// npm i react-router-dom

import { useState } from 'react';
import AddUserForm from '../components/AddUserForm';
import AddList from '../components/AddList';
import {Routes, Route, Link, useNavigate, Router} from 'react-router-dom'
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/users">Show Users</Link>
          </li>
          <li>
            <button onClick={() => navigate("/add-user")}>Add a new user</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/users' element={<AddList/>}/>
        <Route path='/add-user' element={<AddUserForm/>}/>
        <Route path='/' element={<div><h1>Welcome to Prison Manager</h1></div>}/>
      </Routes>
    </>
  );
}

export default App;