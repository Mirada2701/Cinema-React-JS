import React, { useState } from 'react';
import AppLayout from './components/AppLayout';
import { Route, Routes } from 'react-router-dom';
import MoviesList from './components/MoviesList';



const App = () => {
 
  return (
<Routes>
  <Route path='/' element={<AppLayout/>}>
    <Route index element={<p>Home page</p>}/>
    <Route path='/movies' element={<MoviesList/>}/>
    <Route path='/contacts' element={<p>Contacts page</p>}/>
    <Route path='/profile' element={<p>My profile</p>}/>
    <Route path='/about' element={<p>About page</p>}/>
  </Route>
</Routes>

  );

};
export default App;