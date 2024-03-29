import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
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
import MindMapPage from './components/pages/mindmap/MindMapPage/MindMapPage'

// Mock Data
import GenericPage from './components/GenericPage/GenericPage';

function App() {
  const [activeNode, setActiveNode] = useState({});

  const dataTab = activeNode.node_uuid ?
    <NavTab to={`/nodes/${activeNode.node_uuid}`}> {activeNode.name}</NavTab> : null;

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
          <NavTab to="/mindmap">Mind Map</NavTab>
          <NavTab to="/review">Review</NavTab>
          {dataTab}

          <div className="page">

            <Switch>
              <Route path="/create" component={CreatePage} />
              <Route path="/schedule" component={SchedulePage} />
              <Route path="/tasks" component={TaskPage} />
              <Route path="/mindmap" component={MindMapPage} />
              <Route path="/review" component={ReviewPage} />
              <Route path="/nodes/:uuid" render={(routeProps) => <GenericPage setTab={setActiveNode} {...routeProps}></GenericPage>} />
            </Switch>
          </div>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
