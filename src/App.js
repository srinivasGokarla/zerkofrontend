import React from 'react';
import Signup from "./components/Signup";
import { BrowserRouter } from 'react-router-dom';
import './App.css'; 

const App = () => {

  return (
    <div className='App'>
       <BrowserRouter>
      <Signup/>
      </BrowserRouter>
    </div>
  );
};

export default App;
