import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Student from './components/Student';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom'; 
import { Redirect } from 'react-router';

function App() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/student' render={() => (
            <div className="App">
              <Student />
            </div>
          )}/>
         
        </div>
      </BrowserRouter> 
    ); 
  
}

export default App;
