import React from 'react'
import { Routes, Route } from 'react-router-dom'
import User from './Routes/User'
import Admin from './Routes/Admin'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Admin />} path='/admin/*' />
        <Route   element={<User />} path='/*' />
      </Routes>
    </div>
  );
}
 
export default App;
