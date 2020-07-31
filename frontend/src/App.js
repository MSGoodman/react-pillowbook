import React, { useState } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import { NavTab } from "react-router-tabs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './tabs.scss';
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
  const history = useHistory();
  const [activeNodes, setActiveNodes] = useState([]);

  const nodeTabs = activeNodes.map((t, i) =>
    <NavTab to={`/nodes/${t.node_uuid}`} className="closeableTab">
      <span>{t.name}</span> <button className="closeButton" onClick={() => {
        const newArray = activeNodes.slice();
        newArray.splice(i, 1);
        setActiveNodes(newArray);
        // history.push("/create");
      }}><i className="fas fa-times"></i></button>
    </NavTab>);
  const addTab = (newTab) => { if (activeNodes.some(t => t.name == newTab.name)) return; const newArray = activeNodes.slice(); newArray.push(newTab); setActiveNodes(newArray); };

  // useEffect(() => {
  //   fetch("http://localhost:9000/status")
  //     .then(res => res.text())
  //     .then(text => setStatus(text))
  // }, []);

  return (
    <div className="App" id="App">
      <Header></Header>
      <BrowserRouter>

        <div className="appBody">
          <NavTab to="/create">Create</NavTab>
          <NavTab to="/schedule">Schedule</NavTab>
          <NavTab to="/tasks">Tasks</NavTab>
          <NavTab to="/review">Review</NavTab>
          {nodeTabs}

          <div className="page">

            <Switch>
              <Route path="/create" component={CreatePage} />
              <Route path="/schedule" component={SchedulePage} />
              <Route path="/tasks" component={TaskPage} />
              <Route path="/review" component={ReviewPage} />
              <Route path="/nodes/:uuid" render={(routeProps) => <GenericPage addTab={addTab} {...routeProps}></GenericPage>} />
            </Switch>
          </div>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
