import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { NavTab } from "react-router-tabs";
import './tabs.css';
import './App.css';
import CreatePage from './components/pages/create/CreatePage/CreatePage';
import Header from './components/Header/Header';
import SchedulePage from './components/pages/schedule/SchedulePage/SchedulePage';
import TaskPage from './components/pages/tasks/TaskPage/TaskPage';
import ReviewPage from './components/pages/review/ReviewPage/ReviewPage';

// Mock Data
import GenericPage from './components/GenericPage/GenericPage';

function App() {
  const [status, setStatus] = useState('test');

  useEffect(() => {
    fetch("http://localhost:9000/status")
      .then(res => res.text())
      .then(text => setStatus(text))
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>

        <div className="appBody">
          <NavTab to="/create">Create</NavTab>
          <NavTab to="/schedule">Schedule</NavTab>
          <NavTab to="/tasks">Tasks</NavTab>
          <NavTab to="/review">Review</NavTab>
          <NavTab to="/nodes/HorizonZeroDawn">HorizonZeroDawn</NavTab>

          <div className="page">

            <Switch>
              <Route path="/create" component={CreatePage} />
              <Route path="/schedule" component={SchedulePage} />
              <Route path="/tasks" component={TaskPage} />
              <Route path="/review" component={ReviewPage} />
              <Route path="/nodes/:uuid" component={GenericPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
