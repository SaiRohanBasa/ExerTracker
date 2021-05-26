import React, { useState } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
// import DatePicker from 'react-datepicker';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {

  return (
    <Router>
        <div className="App">
          <Navbar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" render={props => <EditExercise {...props}/>} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
        </div>
    </Router>
    
  );
}

export default App;
