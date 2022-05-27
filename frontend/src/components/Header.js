import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => (
  <header>
    <h1>Book Club App</h1>
    <NavLink to="/admin" >Edit</NavLink>
    <NavLink to="/" >Vote</NavLink>
    
  </header>
);

export default Header;